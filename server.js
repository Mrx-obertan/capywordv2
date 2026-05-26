require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// ─── Temp image store (in-memory, 15s TTL) ────────────────────────────────────
const tempImages = new Map(); // imageId -> { data, mimeType, expiresAt, chatId }
const IMAGE_TTL_MS = 15000;  // 15 segundos
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB máximo

function purgeExpiredImages() {
  const now = Date.now();
  tempImages.forEach((img, id) => {
    if (now >= img.expiresAt) tempImages.delete(id);
  });
}
setInterval(purgeExpiredImages, 5000);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 60000
});

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'capyadmin2024';

// ─── In-memory store ───────────────────────────────────────────────────────────
const state = {
  users: new Map(),        // socketId -> { nick, color, avatarSeed, room, mood, isAdmin, joinedAt, banned:false }
  rooms: new Map([         // roomName -> { name, description, msgCount }
    ['Capibara Central 🐾', { name: 'Capibara Central 🐾', description: 'Sala principal', msgCount: 0, locked: false }],
    ['Laguna Tropical 🌴',  { name: 'Laguna Tropical 🌴',  description: 'Playa y diversión', msgCount: 0, locked: false }],
    ['Sabana Latina 🌿',    { name: 'Sabana Latina 🌿',    description: 'Naturaleza y relax', msgCount: 0, locked: false }],
    ['Barrio Capy 🎺',      { name: 'Barrio Capy 🎺',      description: 'Música y baile', msgCount: 0, locked: false }],
    ['Zona +18 🔞',         { name: 'Zona +18 🔞',         description: 'Solo mayores', msgCount: 0, locked: false }],
    ['Futbol & Capy ⚽',    { name: 'Futbol & Capy ⚽',    description: 'Deportes', msgCount: 0, locked: false }],
  ]),
  privateChats: new Map(),  // chatId -> { participants: [nick1,nick2], messages: [] }
  publicMessages: new Map(), // roomName -> messages[]
  bannedNicks: new Set(),
  mutedNicks: new Set(),
  serverStats: { totalMessages: 0, totalUsers: 0, startTime: Date.now() }
};

// Init room message stores
state.rooms.forEach((_, name) => state.publicMessages.set(name, []));

const NICK_COLORS = [
  '#FF6B35','#FFD23F','#FF69B4','#00FF88','#00BFFF',
  '#DA70D6','#FF1493','#ADFF2F','#FFD700','#FF6347',
  '#7FFF00','#FF4500','#1E90FF','#FF00FF','#00CED1'
];

function getColor(nick) {
  let h = 0;
  for (let c of nick) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return NICK_COLORS[Math.abs(h) % NICK_COLORS.length];
}

function getUserList(room) {
  const list = [];
  state.users.forEach(u => {
    if (u.room === room) list.push({ nick: u.nick, color: u.color, mood: u.mood, avatarSeed: u.avatarSeed, avatar: u.avatar || {}, isAdmin: u.isAdmin });
  });
  return list;
}

function getRoomStats() {
  const stats = {};
  state.rooms.forEach((room, name) => {
    let count = 0;
    state.users.forEach(u => { if (u.room === name) count++; });
    stats[name] = { ...room, online: count };
  });
  return stats;
}

function broadcastAdminStats() {
  const adminSockets = [];
  state.users.forEach((u, sid) => { if (u.isAdmin) adminSockets.push(sid); });
  if (!adminSockets.length) return;

  const allUsers = [];
  state.users.forEach((u, sid) => {
    allUsers.push({ socketId: sid, nick: u.nick, color: u.color, room: u.room, mood: u.mood, isAdmin: u.isAdmin, joinedAt: u.joinedAt, banned: state.bannedNicks.has(u.nick), muted: state.mutedNicks.has(u.nick) });
  });

  const payload = {
    users: allUsers,
    rooms: getRoomStats(),
    stats: {
      ...state.serverStats,
      onlineNow: state.users.size,
      uptime: Math.floor((Date.now() - state.serverStats.startTime) / 1000)
    },
    banned: [...state.bannedNicks],
    muted: [...state.mutedNicks]
  };

  adminSockets.forEach(sid => io.to(sid).emit('admin:stats', payload));
}

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting basic (manual)
const ipRequests = new Map();
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const data = ipRequests.get(ip) || { count: 0, reset: now + 60000 };
  if (now > data.reset) { data.count = 0; data.reset = now + 60000; }
  data.count++;
  ipRequests.set(ip, data);
  if (data.count > 200) return res.status(429).json({ error: 'Too many requests' });
  next();
});

// ─── REST API ──────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { nick, password } = req.body;
  if (!nick || nick.length < 2 || nick.length > 16) return res.status(400).json({ error: 'Nick inválido (2-16 chars)' });
  if (!/^[a-zA-Z0-9_\-\.]+$/.test(nick)) return res.status(400).json({ error: 'Nick solo puede tener letras, números, _ - .' });
  if (state.bannedNicks.has(nick.toLowerCase())) return res.status(403).json({ error: 'Este nick está baneado' });

  // Check duplicate nick
  let taken = false;
  state.users.forEach(u => { if (u.nick.toLowerCase() === nick.toLowerCase()) taken = true; });
  if (taken) return res.status(409).json({ error: 'Nick ya está en uso' });

  const isAdmin = (nick === ADMIN_USER && password === ADMIN_PASS);
  res.json({ ok: true, nick, color: getColor(nick), isAdmin, avatarSeed: Math.floor(Math.random() * 100) });
});

app.get('/api/rooms', (req, res) => {
  res.json(getRoomStats());
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// ─── Temp Image Upload ─────────────────────────────────────────────────────
app.post('/api/upload-image', express.raw({ type: ['image/jpeg','image/png','image/gif','image/webp'], limit: '2mb' }), (req, res) => {
  const mimeType = req.headers['content-type'];
  if (!mimeType || !mimeType.startsWith('image/')) return res.status(400).json({ error: 'Tipo no soportado' });
  if (!req.body || req.body.length === 0) return res.status(400).json({ error: 'Sin datos' });
  if (req.body.length > MAX_IMAGE_SIZE) return res.status(413).json({ error: 'Imagen muy grande (máx 2MB)' });
  const imageId = uuidv4();
  const expiresAt = Date.now() + IMAGE_TTL_MS;
  tempImages.set(imageId, { data: req.body, mimeType, expiresAt });
  res.json({ imageId, expiresIn: IMAGE_TTL_MS / 1000 });
});

app.get('/api/image/:imageId', (req, res) => {
  const img = tempImages.get(req.params.imageId);
  if (!img || Date.now() >= img.expiresAt) return res.status(404).json({ error: 'Imagen expirada' });
  res.set('Content-Type', img.mimeType);
  res.set('Cache-Control', 'no-store');
  res.send(img.data);
});

// ─── Socket.io ────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {

  // ── JOIN ──
  socket.on('user:join', ({ nick, color, avatarSeed, avatar, isAdmin, room }) => {
    if (!nick || state.bannedNicks.has(nick.toLowerCase())) {
      socket.emit('error:banned'); return;
    }
    // Prevent dup nick
    let taken = false;
    state.users.forEach((u, sid) => { if (u.nick.toLowerCase() === nick.toLowerCase() && sid !== socket.id) taken = true; });
    if (taken) { socket.emit('error:nick_taken'); return; }

    const targetRoom = room || 'Capibara Central 🐾';
    const userData = { nick, color: color || getColor(nick), avatarSeed: avatarSeed || 0, avatar: avatar || {}, room: targetRoom, mood: '😊', isAdmin: !!isAdmin, joinedAt: Date.now() };
    state.users.set(socket.id, userData);
    state.serverStats.totalUsers++;

    socket.join(targetRoom);

    // Send last 50 messages of room
    const history = (state.publicMessages.get(targetRoom) || []).slice(-50);
    socket.emit('room:history', { room: targetRoom, messages: history });
    socket.emit('rooms:list', getRoomStats());

    // Notify room
    io.to(targetRoom).emit('room:user_list', getUserList(targetRoom));
    io.to(targetRoom).emit('chat:system', { room: targetRoom, text: `🐾 ${nick} entró a la sala`, ts: Date.now() });

    broadcastAdminStats();
    console.log(`[JOIN] ${nick} -> ${targetRoom}`);
  });

  // ── CHAT MESSAGE ──
  socket.on('chat:message', ({ text, room }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    if (state.mutedNicks.has(user.nick.toLowerCase())) {
      socket.emit('chat:system', { room, text: '🔇 Estás silenciado por un moderador', ts: Date.now() }); return;
    }
    if (!text || text.trim().length === 0 || text.length > 300) return;

    const msg = { id: uuidv4(), nick: user.nick, color: user.color, mood: user.mood, avatarSeed: user.avatarSeed, text: text.trim(), ts: Date.now(), room };
    const msgs = state.publicMessages.get(room) || [];
    msgs.push(msg);
    if (msgs.length > 200) msgs.shift();
    state.publicMessages.set(room, msgs);

    const roomData = state.rooms.get(room);
    if (roomData) roomData.msgCount++;
    state.serverStats.totalMessages++;

    io.to(room).emit('chat:message', msg);
    broadcastAdminStats();
  });

  // ── SWITCH ROOM ──
  socket.on('room:switch', ({ room }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    const roomData = state.rooms.get(room);
    if (!roomData) return;

    const oldRoom = user.room;
    socket.leave(oldRoom);
    io.to(oldRoom).emit('room:user_list', getUserList(oldRoom));
    io.to(oldRoom).emit('chat:system', { room: oldRoom, text: `🚪 ${user.nick} fue a ${room}`, ts: Date.now() });

    user.room = room;
    socket.join(room);

    const history = (state.publicMessages.get(room) || []).slice(-50);
    socket.emit('room:history', { room, messages: history });
    io.to(room).emit('room:user_list', getUserList(room));
    io.to(room).emit('chat:system', { room, text: `🐾 ${user.nick} entró a la sala`, ts: Date.now() });
    broadcastAdminStats();
  });

  // ── MOOD ──
  socket.on('user:mood', ({ mood }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    user.mood = mood;
    io.to(user.room).emit('room:user_list', getUserList(user.room));
  });

  // ── TYPING ──
  socket.on('chat:typing', ({ room }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    socket.to(room).emit('chat:typing', { nick: user.nick, room });
  });

  // ── PRIVATE CHAT ──
  socket.on('private:start', ({ toNick }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    let targetSid = null;
    state.users.forEach((u, sid) => { if (u.nick === toNick) targetSid = sid; });
    if (!targetSid) { socket.emit('private:error', { msg: 'Usuario no encontrado o desconectado' }); return; }

    const chatId = [user.nick, toNick].sort().join('::');
    if (!state.privateChats.has(chatId)) state.privateChats.set(chatId, { participants: [user.nick, toNick], messages: [] });

    const history = state.privateChats.get(chatId).messages.slice(-50);
    socket.emit('private:open', { chatId, toNick, toColor: state.users.get(targetSid)?.color, history });
    io.to(targetSid).emit('private:incoming', { chatId, fromNick: user.nick, fromColor: user.color });
  });

  socket.on('private:message', ({ chatId, text, imageId }) => {
    const user = state.users.get(socket.id);
    if (!user) return;

    const chat = state.privateChats.get(chatId);
    if (!chat || !chat.participants.includes(user.nick)) return;

    // Image message
    if (imageId) {
      const img = tempImages.get(imageId);
      if (!img || Date.now() >= img.expiresAt) {
        socket.emit('private:error', { msg: 'La imagen ya expiró antes de enviarse' }); return;
      }
      const msg = { id: uuidv4(), nick: user.nick, color: user.color, imageId, expiresAt: img.expiresAt, ts: Date.now() };
      // Don't persist image messages in history
      const otherNick = chat.participants.find(n => n !== user.nick);
      let otherSid = null;
      state.users.forEach((u, sid) => { if (u.nick === otherNick) otherSid = sid; });
      socket.emit('private:message', { chatId, msg });
      if (otherSid) io.to(otherSid).emit('private:message', { chatId, msg });
      return;
    }

    // Text message
    if (!text || text.trim().length === 0 || text.length > 300) return;
    const msg = { id: uuidv4(), nick: user.nick, color: user.color, text: text.trim(), ts: Date.now() };
    chat.messages.push(msg);
    if (chat.messages.length > 100) chat.messages.shift();

    const otherNick = chat.participants.find(n => n !== user.nick);
    let otherSid = null;
    state.users.forEach((u, sid) => { if (u.nick === otherNick) otherSid = sid; });

    socket.emit('private:message', { chatId, msg });
    if (otherSid) io.to(otherSid).emit('private:message', { chatId, msg });
  });

  socket.on('private:accept', ({ chatId, fromNick }) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    if (!state.privateChats.has(chatId)) state.privateChats.set(chatId, { participants: [fromNick, user.nick], messages: [] });
    const history = state.privateChats.get(chatId).messages.slice(-50);
    socket.emit('private:open', { chatId, toNick: fromNick, history });
  });

  // ── ADMIN ACTIONS ──
  socket.on('admin:kick', ({ targetNick }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    state.users.forEach((u, sid) => {
      if (u.nick === targetNick) {
        io.to(sid).emit('error:kicked', { reason: 'Fuiste expulsado por un administrador' });
        io.to(sid).disconnectSockets(true);
        io.to(u.room).emit('chat:system', { room: u.room, text: `🚫 ${targetNick} fue expulsado`, ts: Date.now() });
      }
    });
    broadcastAdminStats();
  });

  socket.on('admin:ban', ({ targetNick }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    state.bannedNicks.add(targetNick.toLowerCase());
    state.users.forEach((u, sid) => {
      if (u.nick === targetNick) {
        io.to(sid).emit('error:banned');
        io.to(sid).disconnectSockets(true);
        io.to(u.room).emit('chat:system', { room: u.room, text: `⛔ ${targetNick} fue baneado`, ts: Date.now() });
      }
    });
    broadcastAdminStats();
  });

  socket.on('admin:unban', ({ nick }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    state.bannedNicks.delete(nick.toLowerCase());
    broadcastAdminStats();
  });

  socket.on('admin:mute', ({ targetNick }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    state.mutedNicks.add(targetNick.toLowerCase());
    state.users.forEach((u, sid) => {
      if (u.nick === targetNick) io.to(sid).emit('chat:system', { room: u.room, text: '🔇 Has sido silenciado por un administrador', ts: Date.now() });
    });
    broadcastAdminStats();
  });

  socket.on('admin:unmute', ({ nick }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    state.mutedNicks.delete(nick.toLowerCase());
    broadcastAdminStats();
  });

  socket.on('admin:broadcast', ({ text }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    io.emit('chat:broadcast', { text: `📢 ADMIN: ${text}`, ts: Date.now() });
  });

  socket.on('admin:create_room', ({ name, description }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    if (state.rooms.has(name)) return;
    state.rooms.set(name, { name, description, msgCount: 0, locked: false });
    state.publicMessages.set(name, []);
    io.emit('rooms:list', getRoomStats());
    broadcastAdminStats();
  });

  socket.on('admin:delete_room', ({ name }) => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin || name === 'Capibara Central 🐾') return;
    state.rooms.delete(name);
    io.emit('rooms:list', getRoomStats());
    broadcastAdminStats();
  });

  socket.on('admin:request_stats', () => {
    const user = state.users.get(socket.id);
    if (!user?.isAdmin) return;
    broadcastAdminStats();
  });

  // ── AVATAR UPDATE ──
  socket.on('user:avatar', (avatar) => {
    const user = state.users.get(socket.id);
    if (!user) return;
    user.avatar = avatar;
    io.to(user.room).emit('room:user_list', getUserList(user.room));
  });

  // ── DISCONNECT ──
  socket.on('disconnect', () => {
    const user = state.users.get(socket.id);
    if (!user) return;
    const room = user.room;
    state.users.delete(socket.id);
    io.to(room).emit('room:user_list', getUserList(room));
    io.to(room).emit('chat:system', { room, text: `👋 ${user.nick} salió de la sala`, ts: Date.now() });
    broadcastAdminStats();
    console.log(`[LEAVE] ${user.nick}`);
  });
});

// Broadcast online count every 10s
setInterval(() => {
  io.emit('stats:online', { count: state.users.size });
  broadcastAdminStats();
}, 10000);

server.listen(PORT, () => {
  console.log(`\n🐾 CapyWorld Chat corriendo en http://localhost:${PORT}`);
  console.log(`🔑 Admin: usuario="${ADMIN_USER}" pass="${ADMIN_PASS}"`);
  console.log(`📋 Copiar .env.example a .env y personalizar\n`);
});
