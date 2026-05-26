'use strict';

// ─── AVATAR CONFIG ──────────────────────────────────────────────────────────
const AV = {
  BODY_COLORS: [
    '#8B5E3C','#A0714F','#C49A6C','#6B3F1F','#4A2C0A',
    '#D4A853','#7A9E5F','#5B8A8A','#8A5B8A','#3C6B8A',
    '#C46E4B','#8AC4C4','#C4A08A','#6B8A5B','#8A6B3C'
  ],
  ACC_COLORS: [
    '#FF6B35','#FF69B4','#FFD700','#00FF88','#00BFFF',
    '#DA70D6','#FF1493','#ADFF2F','#FF4500','#7B2FBE',
    '#06B6D4','#F59E0B','#EC4899','#10B981','#EF4444'
  ],
  HATS: [
    { id: 0, label: '🎩', name: 'Sombrero' },
    { id: 1, label: '🎪', name: 'Gorra' },
    { id: 2, label: '✨', name: 'Antenna' },
    { id: 3, label: '👑', name: 'Corona' },
    { id: 4, label: '🌸', name: 'Flor' },
    { id: 5, label: '🎓', name: 'Birrete' },
    { id: 6, label: '🎸', name: 'Rockero' },
    { id: 7, label: '🪖', name: 'Casco' },
  ],
  EYES: [
    { id: 0, label: '😊', name: 'Normal' },
    { id: 1, label: '😎', name: 'Cool' },
    { id: 2, label: '😍', name: 'Corazón' },
    { id: 3, label: '😴', name: 'Dormido' },
    { id: 4, label: '😤', name: 'Bravo' },
  ]
};

// ─── AVATAR SVG ─────────────────────────────────────────────────────────────
function capySVG(color, accColor, hatId, eyeId) {
  color = color || '#8B5E3C';
  accColor = accColor || '#FF6B35';
  hatId = hatId ?? 0;
  eyeId = eyeId ?? 0;

  // HAT
  const hats = {
    0: `<rect x="12" y="6" width="16" height="2.5" fill="${accColor}" stroke="#111" stroke-width="0.5" rx="1"/>
        <rect x="15" y="1.5" width="10" height="5.5" fill="${accColor}" stroke="#111" stroke-width="0.5" rx="1"/>`,
    1: `<ellipse cx="20" cy="7" rx="9" ry="3.5" fill="${accColor}" stroke="#111" stroke-width="0.5"/>
        <rect x="16" y="3.5" width="8" height="4" fill="${accColor}" stroke="#111" stroke-width="0.5" rx="1"/>`,
    2: `<line x1="20" y1="2" x2="20" y2="10" stroke="${accColor}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="20" cy="2" r="3" fill="${accColor}" stroke="#111" stroke-width="0.5"/>
        <circle cx="20" cy="2" r="1.2" fill="#fff" opacity="0.6"/>`,
    3: `<path d="M11,10 L20,4 L29,10 L27,10 L20,5.5 L13,10 Z" fill="${accColor}" stroke="#111" stroke-width="0.5"/>
        <rect x="14" y="9.5" width="12" height="2" fill="${accColor}" stroke="#111" stroke-width="0.5"/>`,
    4: `<circle cx="20" cy="6" r="5" fill="${accColor}" stroke="#111" stroke-width="0.5" opacity="0.9"/>
        <circle cx="18" cy="5" r="1.5" fill="#FF69B4"/>
        <circle cx="22" cy="5" r="1.5" fill="#FF69B4"/>
        <circle cx="20" cy="4" r="1.5" fill="#FF69B4"/>`,
    5: `<rect x="15" y="3" width="10" height="6" fill="${accColor}" rx="2" stroke="#111" stroke-width="0.5"/>
        <rect x="13" y="8.5" width="14" height="2" fill="${accColor}" stroke="#111" stroke-width="0.5" rx="0.5"/>
        <line x1="20" y1="3" x2="22" y2="0" stroke="#888" stroke-width="1.5"/>`,
    6: `<line x1="14" y1="11" x2="14" y2="3" stroke="${accColor}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="14" y1="3" x2="20" y2="5" stroke="${accColor}" stroke-width="2" stroke-linecap="round"/>
        <line x1="14" y1="6" x2="19" y2="7" stroke="${accColor}" stroke-width="1.5" stroke-linecap="round"/>`,
    7: `<ellipse cx="20" cy="8" rx="9" ry="6" fill="${accColor}" stroke="#111" stroke-width="0.5"/>
        <ellipse cx="20" cy="5" rx="8" ry="4" fill="${accColor}" stroke="#111" stroke-width="0.5"/>
        <line x1="11" y1="8" x2="29" y2="8" stroke="#111" stroke-width="0.8" opacity="0.4"/>`
  };

  // EYES
  const eyes = {
    0: `<circle cx="16.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <circle cx="23.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <circle cx="17.2" cy="21" r="1.3" fill="#111"/>
        <circle cx="24.2" cy="21" r="1.3" fill="#111"/>
        <circle cx="17.6" cy="20.6" r="0.45" fill="#fff"/>
        <circle cx="24.6" cy="20.6" r="0.45" fill="#fff"/>`,
    1: `<ellipse cx="16.5" cy="21" rx="2.5" ry="1.8" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <ellipse cx="23.5" cy="21" rx="2.5" ry="1.8" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <ellipse cx="17" cy="21.2" rx="1.2" ry="0.9" fill="#111"/>
        <ellipse cx="24" cy="21.2" rx="1.2" ry="0.9" fill="#111"/>
        <line x1="14.5" y1="19.5" x2="18.5" y2="19.5" stroke="#333" stroke-width="1" stroke-linecap="round"/>
        <line x1="21.5" y1="19.5" x2="25.5" y2="19.5" stroke="#333" stroke-width="1" stroke-linecap="round"/>`,
    2: `<circle cx="16.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <circle cx="23.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <path d="M15,20.5 Q16.5,22.5 18,20.5" fill="#FF4080" stroke="none"/>
        <path d="M22,20.5 Q23.5,22.5 25,20.5" fill="#FF4080" stroke="none"/>`,
    3: `<path d="M14,20.5 Q16.5,22.5 19,20.5" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M21,20.5 Q23.5,22.5 26,20.5" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="15" y1="20.5" x2="18" y2="20.5" stroke="#555" stroke-width="2" stroke-linecap="round"/>
        <line x1="22" y1="20.5" x2="25" y2="20.5" stroke="#555" stroke-width="2" stroke-linecap="round"/>`,
    4: `<circle cx="16.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <circle cx="23.5" cy="20.5" r="2.5" fill="#fff" stroke="#222" stroke-width="0.5"/>
        <circle cx="17.2" cy="21" r="1.5" fill="#c00"/>
        <circle cx="24.2" cy="21" r="1.5" fill="#c00"/>
        <line x1="14.5" y1="18.8" x2="18.5" y2="20.2" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="21.5" y1="20.2" x2="25.5" y2="18.8" stroke="#333" stroke-width="1.2" stroke-linecap="round"/>`
  };

  const nose = `<ellipse cx="20" cy="24" rx="3.5" ry="1.8" fill="#CC9977"/>
    <ellipse cx="17.8" cy="23.5" rx="1.1" ry="0.7" fill="#AA7755"/>
    <ellipse cx="22.2" cy="23.5" rx="1.1" ry="0.7" fill="#AA7755"/>`;

  return `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="27" rx="14" ry="10" fill="${color}" stroke="#222" stroke-width="0.8"/>
    <ellipse cx="20" cy="19.5" rx="10" ry="9" fill="${color}" stroke="#222" stroke-width="0.8"/>
    <ellipse cx="14" cy="12" rx="4" ry="6" fill="${color}" stroke="#222" stroke-width="0.7"/>
    <ellipse cx="26" cy="12" rx="4" ry="6" fill="${color}" stroke="#222" stroke-width="0.7"/>
    <ellipse cx="14" cy="10" rx="2.5" ry="4" fill="#CC9977"/>
    <ellipse cx="26" cy="10" rx="2.5" ry="4" fill="#CC9977"/>
    ${hats[hatId] || hats[0]}
    ${eyes[eyeId] || eyes[0]}
    ${nose}
    <ellipse cx="10" cy="31" rx="5" ry="3" fill="${color}" stroke="#222" stroke-width="0.7"/>
    <ellipse cx="30" cy="31" rx="5" ry="3" fill="${color}" stroke="#222" stroke-width="0.7"/>
    <ellipse cx="14" cy="37" rx="4" ry="2.5" fill="${color}" stroke="#222" stroke-width="0.7"/>
    <ellipse cx="26" cy="37" rx="4" ry="2.5" fill="${color}" stroke="#222" stroke-width="0.7"/>
  </svg>`;
}

// ─── STATE ──────────────────────────────────────────────────────────────────
const S = {
  socket: null,
  myNick: '', myColor: '', myMood: '😊', isAdmin: false,
  avatar: { bodyColor: '#8B5E3C', accColor: '#FF6B35', hatId: 0, eyeId: 0 },
  currentRoom: 'Capibara Central 🐾',
  rooms: {}, users: [], privateChats: {}, typingTimers: {}, ctxTarget: null,
};

function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtTime(ts) { const d=new Date(ts); return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'); }
function scrollBottom(el) { if(el) el.scrollTop = el.scrollHeight; }

// ─── STARS ──────────────────────────────────────────────────────────────────
function makeStars(id, n) {
  const c = document.getElementById(id); if(!c) return; c.innerHTML = '';
  for(let i=0;i<n;i++){
    const s=document.createElement('div'); s.className='star';
    s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*80+'%';
    s.style.animationDelay=Math.random()*3+'s';
    s.style.animationDuration=(1.5+Math.random()*2)+'s';
    c.appendChild(s);
  }
}

// ─── AVATAR CUSTOMIZER ──────────────────────────────────────────────────────
let tmpAv = {};

function openAvatarCustomizer() {
  tmpAv = { ...S.avatar };
  buildCustomizerUI();
  updatePreview();
  document.getElementById('avatarModal').style.display = 'flex';
}

function closeAvatarCustomizer() { document.getElementById('avatarModal').style.display = 'none'; }
function closeAvatarIfBg(e) { if(e.target===document.getElementById('avatarModal')) closeAvatarCustomizer(); }

function buildCustomizerUI() {
  // Body colors
  const bodyGrid = document.getElementById('avBodyColors');
  bodyGrid.innerHTML = '';
  AV.BODY_COLORS.forEach(c => {
    const el = document.createElement('div');
    el.className = 'av-color-swatch' + (c === tmpAv.bodyColor ? ' active' : '');
    el.style.background = c;
    el.title = c;
    el.onclick = () => { tmpAv.bodyColor = c; document.querySelectorAll('#avBodyColors .av-color-swatch').forEach(s=>s.classList.remove('active')); el.classList.add('active'); updatePreview(); };
    bodyGrid.appendChild(el);
  });

  // Hats
  const hatGrid = document.getElementById('avHats');
  hatGrid.innerHTML = '';
  AV.HATS.forEach(h => {
    const el = document.createElement('button');
    el.className = 'av-hat-btn' + (h.id === tmpAv.hatId ? ' active' : '');
    el.title = h.name; el.textContent = h.label;
    el.onclick = () => { tmpAv.hatId = h.id; document.querySelectorAll('#avHats .av-hat-btn').forEach(b=>b.classList.remove('active')); el.classList.add('active'); updatePreview(); };
    hatGrid.appendChild(el);
  });

  // Acc colors
  const accGrid = document.getElementById('avAccColors');
  accGrid.innerHTML = '';
  AV.ACC_COLORS.forEach(c => {
    const el = document.createElement('div');
    el.className = 'av-acc-swatch' + (c === tmpAv.accColor ? ' active' : '');
    el.style.background = c;
    el.title = c;
    el.onclick = () => { tmpAv.accColor = c; document.querySelectorAll('#avAccColors .av-acc-swatch').forEach(s=>s.classList.remove('active')); el.classList.add('active'); updatePreview(); };
    accGrid.appendChild(el);
  });

  // Eyes
  const eyeGrid = document.getElementById('avEyes');
  eyeGrid.innerHTML = '';
  AV.EYES.forEach(e => {
    const el = document.createElement('button');
    el.className = 'av-hat-btn' + (e.id === tmpAv.eyeId ? ' active' : '');
    el.title = e.name; el.textContent = e.label;
    el.onclick = () => { tmpAv.eyeId = e.id; document.querySelectorAll('#avEyes .av-hat-btn').forEach(b=>b.classList.remove('active')); el.classList.add('active'); updatePreview(); };
    eyeGrid.appendChild(el);
  });
}

function updatePreview() {
  document.getElementById('avPreview').innerHTML = capySVG(tmpAv.bodyColor, tmpAv.accColor, tmpAv.hatId, tmpAv.eyeId);
}

function saveAvatar() {
  S.avatar = { ...tmpAv };
  closeAvatarCustomizer();
  if(S.socket) S.socket.emit('user:avatar', S.avatar);
  // Refresh world and user list
  renderWorldCapys(S.users);
  renderUsersList(S.users);
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
async function loadRoomsForLogin() {
  try {
    const res = await fetch('/api/rooms');
    const rooms = await res.json();
    const sel = document.getElementById('loginRoom');
    sel.innerHTML = '';
    Object.keys(rooms).forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name + ' (' + rooms[name].online + ' online)';
      sel.appendChild(opt);
    });
  } catch(e) {}
}

async function doLogin() {
  const nick = document.getElementById('loginNick').value.trim();
  const pass = document.getElementById('loginPass').value;
  const room = document.getElementById('loginRoom').value;
  const errEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  errEl.style.display = 'none';
  btn.disabled = true; btn.textContent = 'Conectando...';
  try {
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nick, password:pass}) });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error||'Error'; errEl.style.display='block'; btn.disabled=false; btn.textContent='¡¡ENTRAR AL CHAT!!'; return; }
    S.myNick = data.nick; S.myColor = data.color; S.isAdmin = data.isAdmin;
    S.currentRoom = room;
    initChat();
  } catch(e) { errEl.textContent='No se pudo conectar'; errEl.style.display='block'; btn.disabled=false; btn.textContent='¡¡ENTRAR AL CHAT!!'; }
}

function logout() {
  if(!confirm('¿Salir de CapyWorld?')) return;
  if(S.socket) S.socket.disconnect();
  location.reload();
}

// ─── INIT CHAT ───────────────────────────────────────────────────────────────
function initChat() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('chatApp').style.display = 'flex';
  document.getElementById('myNickBadge').textContent = S.myNick + ' ' + S.myMood;
  if(S.isAdmin) { document.getElementById('adminQuickPanel').style.display='block'; document.querySelectorAll('.admin-only').forEach(el=>el.style.display='block'); }
  makeStars('worldStars', 25);
  document.getElementById('worldRoomName').textContent = S.currentRoom;
  S.socket = io();
  bindSocketEvents();
  S.socket.emit('user:join', { nick:S.myNick, color:S.myColor, avatarSeed:0, isAdmin:S.isAdmin, room:S.currentRoom, avatar:S.avatar });
  document.addEventListener('click', closeContextMenu);
}

// ─── SOCKET EVENTS ───────────────────────────────────────────────────────────
function bindSocketEvents() {
  const sk = S.socket;
  sk.on('connect', ()=>{});
  sk.on('disconnect', ()=>appendSystem('⚡ Conexión perdida. Reconectando...'));
  sk.on('reconnect', ()=>{ appendSystem('✅ Reconectado'); sk.emit('user:join',{nick:S.myNick,color:S.myColor,avatarSeed:0,isAdmin:S.isAdmin,room:S.currentRoom,avatar:S.avatar}); });
  sk.on('error:banned', ()=>{ alert('⛔ Nick baneado.'); location.reload(); });
  sk.on('error:kicked', ({reason})=>{ alert('🚫 '+reason); location.reload(); });
  sk.on('error:nick_taken', ()=>{ alert('❌ Nick en uso.'); location.reload(); });
  sk.on('rooms:list', (rooms)=>{ S.rooms=rooms; renderRoomTabs(); updateLoginRooms(rooms); });
  sk.on('room:history', ({room,messages})=>{ if(room!==S.currentRoom)return; document.getElementById('messagesArea').innerHTML=''; messages.forEach(renderMsg); scrollBottom(document.getElementById('messagesArea')); });
  sk.on('room:user_list', (users)=>{ S.users=users; renderUsersList(users); renderWorldCapys(users); });
  sk.on('chat:message', (msg)=>{ if(msg.room!==S.currentRoom)return; renderMsg(msg); scrollBottom(document.getElementById('messagesArea')); clearTypingFor(msg.nick); });
  sk.on('chat:system', ({room,text})=>{ if(room!==S.currentRoom)return; appendSystem(text); });
  sk.on('chat:broadcast', ({text})=>{ const a=document.getElementById('messagesArea'); const d=document.createElement('div'); d.className='msg msg-broadcast'; d.textContent=text; a.appendChild(d); scrollBottom(a); });
  sk.on('chat:typing', ({nick,room})=>{ if(room!==S.currentRoom||nick===S.myNick)return; showTyping(nick); });
  sk.on('stats:online', ({count})=>{ document.getElementById('onlineBadge').textContent=count; document.getElementById('onlineCountBig').textContent=count; });
  sk.on('private:open', ({chatId,toNick,toColor,history})=>openPrivateWindow(chatId,toNick,toColor||'#AAAAFF',history||[]));
  sk.on('private:incoming', ({chatId,fromNick,fromColor})=>showIncomingPrivate(chatId,fromNick,fromColor));
  sk.on('private:message', ({chatId,msg})=>handlePrivateMessage(chatId,msg));
  sk.on('private:error', ({msg})=>alert('💬 '+msg));
  sk.on('admin:stats', (data)=>renderAdminStats(data));
}

// ─── ROOMS ───────────────────────────────────────────────────────────────────
function renderRoomTabs() {
  const bar = document.getElementById('roomsBar'); bar.innerHTML='';
  Object.keys(S.rooms).forEach(name=>{ const btn=document.createElement('button'); btn.className='room-tab'+(name===S.currentRoom?' active':''); btn.textContent=name; btn.onclick=()=>switchRoom(name); bar.appendChild(btn); });
}
function updateLoginRooms(rooms) { const sel=document.getElementById('loginRoom'); if(!sel)return; sel.innerHTML=''; Object.keys(rooms).forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=n+' ('+rooms[n].online+')';sel.appendChild(o);}); }
function switchRoom(name) { if(name===S.currentRoom)return; S.currentRoom=name; document.getElementById('worldRoomName').textContent=name; document.getElementById('messagesArea').innerHTML=''; renderRoomTabs(); S.socket.emit('room:switch',{room:name}); }

// ─── MESSAGES ────────────────────────────────────────────────────────────────
function renderMsg(msg) {
  const area=document.getElementById('messagesArea');
  const d=document.createElement('div');
  d.className='msg'+(msg.isAdmin?' msg-admin':'');
  d.innerHTML=`<span class="msg-time">[${fmtTime(msg.ts)}]</span><span class="msg-nick" style="color:${esc(msg.color)}" data-nick="${esc(msg.nick)}" oncontextmenu="showCtxMenu(event,'${esc(msg.nick)}')" onclick="showCtxMenu(event,'${esc(msg.nick)}')">${esc(msg.nick)} ${esc(msg.mood||'')}</span>: <span class="msg-text">${esc(msg.text)}</span>`;
  area.appendChild(d);
}
function appendSystem(text) { const a=document.getElementById('messagesArea'); const d=document.createElement('div'); d.className='msg msg-system'; d.textContent=text; a.appendChild(d); scrollBottom(a); }

// ─── TYPING ──────────────────────────────────────────────────────────────────
let typingUsers=new Set();
function showTyping(nick) { typingUsers.add(nick); renderTypingBar(); clearTimeout(S.typingTimers[nick]); S.typingTimers[nick]=setTimeout(()=>clearTypingFor(nick),3000); }
function clearTypingFor(nick) { typingUsers.delete(nick); renderTypingBar(); }
function renderTypingBar() { const b=document.getElementById('typingBar'); if(!typingUsers.size){b.style.display='none';return;} b.textContent=[...typingUsers].slice(0,3).join(', ')+(typingUsers.size===1?' está escribiendo...':' están escribiendo...'); b.style.display='block'; }
let myTypingTimer=null;
function handleTyping() { clearTimeout(myTypingTimer); S.socket.emit('chat:typing',{room:S.currentRoom}); myTypingTimer=setTimeout(()=>{},2000); }

// ─── SEND ────────────────────────────────────────────────────────────────────
function sendMessage() { const inp=document.getElementById('msgInput'); const text=inp.value.trim(); if(!text)return; S.socket.emit('chat:message',{text,room:S.currentRoom}); inp.value=''; inp.focus(); }
function handleKey(e) { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} }
function addEmoji(e) { const inp=document.getElementById('msgInput'); inp.value+=e; inp.focus(); }

// ─── MOOD ─────────────────────────────────────────────────────────────────────
function setMood(emoji, el) {
  S.myMood=emoji;
  document.getElementById('myNickBadge').textContent=S.myNick+' '+emoji;
  document.querySelectorAll('.mq').forEach(m=>m.classList.remove('active'));
  if(el) el.classList.add('active');
  if(S.socket) S.socket.emit('user:mood',{mood:emoji});
}

// ─── USERS LIST ──────────────────────────────────────────────────────────────
function renderUsersList(users) {
  const list=document.getElementById('usersList');
  document.getElementById('usersCount').textContent=users.length;
  list.innerHTML='';
  users.forEach(u=>{
    const av = u.avatar || {};
    const d=document.createElement('div'); d.className='user-item';
    d.innerHTML=`<div class="avatar">${capySVG(av.bodyColor||u.color,av.accColor,av.hatId,av.eyeId)}</div>
      <div class="user-info">
        <div class="user-nick" style="color:${esc(u.color)}">${esc(u.nick)}</div>
        ${u.isAdmin?'<div class="user-admin-tag">⚙ ADMIN</div>':`<div class="user-status">${esc(u.mood||'😊')} online</div>`}
      </div>`;
    d.addEventListener('contextmenu',e=>showCtxMenu(e,u.nick));
    d.addEventListener('click',e=>showCtxMenu(e,u.nick));
    list.appendChild(d);
  });
}

// ─── WORLD ───────────────────────────────────────────────────────────────────
function renderWorldCapys(users) {
  const c=document.getElementById('worldCapys'); c.innerHTML='';
  const shown=users.slice(0,8);
  const step=100/(shown.length+1);
  shown.forEach((u,i)=>{
    const av = u.avatar || {};
    const d=document.createElement('div'); d.className='world-capy';
    d.style.left=(step*(i+1))+'%'; d.style.transform='translateX(-50%)';
    d.innerHTML=`<div class="wc-bubble">${esc(u.mood||'😊')} ${esc(u.nick)}</div>${capySVG(av.bodyColor||u.color,av.accColor,av.hatId,av.eyeId)}<div class="wc-name">${esc(u.nick)}</div>`;
    d.onclick=()=>startPrivateChat(u.nick);
    c.appendChild(d);
  });
}

// ─── CONTEXT MENU ────────────────────────────────────────────────────────────
function showCtxMenu(e,nick) { e.preventDefault(); e.stopPropagation(); if(nick===S.myNick)return; S.ctxTarget=nick; const m=document.getElementById('contextMenu'); document.getElementById('cmNick').textContent='🐾 '+nick; m.style.display='block'; m.style.left=Math.min(e.clientX,window.innerWidth-170)+'px'; m.style.top=Math.min(e.clientY,window.innerHeight-200)+'px'; }
function closeContextMenu() { document.getElementById('contextMenu').style.display='none'; }
function ctxPrivate() { closeContextMenu(); startPrivateChat(S.ctxTarget); }
function ctxMention() { closeContextMenu(); const inp=document.getElementById('msgInput'); inp.value='@'+S.ctxTarget+' '+inp.value; inp.focus(); }
function ctxKick() { closeContextMenu(); if(confirm('Expulsar a '+S.ctxTarget+'?')) S.socket.emit('admin:kick',{targetNick:S.ctxTarget}); }
function ctxBan() { closeContextMenu(); if(confirm('Banear a '+S.ctxTarget+'?')) S.socket.emit('admin:ban',{targetNick:S.ctxTarget}); }
function ctxMute() { closeContextMenu(); S.socket.emit('admin:mute',{targetNick:S.ctxTarget}); }

// ─── PRIVATE CHATS ───────────────────────────────────────────────────────────
function startPrivateChat(toNick) { if(toNick===S.myNick)return; S.socket.emit('private:start',{toNick}); }

function openPrivateWindow(chatId, toNick, toColor, history) {
  if(S.privateChats[chatId]?.windowEl){ S.privateChats[chatId].windowEl.style.display='flex'; return; }
  const win=document.createElement('div'); win.className='private-window';
  const offset=Object.keys(S.privateChats).length;
  win.style.right=(16+offset*278)+'px'; win.id='pw-'+chatId;
  win.innerHTML=`<div class="pw-header" id="pwh-${chatId}">
    <div style="width:22px;height:22px;flex-shrink:0">${capySVG(toColor,null,0,0).replace('viewBox="0 0 40 40"','viewBox="0 0 40 40" width="22" height="22"')}</div>
    <div class="pw-title" style="color:${esc(toColor)}">💬 ${esc(toNick)}</div>
    <button class="pw-close" onclick="closePrivateWindow('${chatId}')">✕</button>
  </div>
  <div class="pw-msgs" id="pwm-${chatId}"></div>
  <div class="pw-input-row">
    <label class="pw-img-btn" title="Enviar imagen temporal (15s)">
      📷<input type="file" accept="image/*" style="display:none" onchange="sendPrivateImage('${chatId}',this)">
    </label>
    <input class="pw-input" id="pwi-${chatId}" placeholder="Mensaje privado..." maxlength="300" onkeydown="if(event.key==='Enter'){sendPrivateMsg('${chatId}');event.preventDefault()}"/>
    <button class="pw-send" onclick="sendPrivateMsg('${chatId}')">ENVIAR</button>
  </div>`;
  document.getElementById('privateWindows').appendChild(win);
  S.privateChats[chatId]={toNick,toColor,messages:[],unread:0,windowEl:win};
  history.forEach(m=>appendPrivateMsg(chatId,m));
  scrollBottom(document.getElementById('pwm-'+chatId));
  makeDraggable(win,'pwh-'+chatId);
  updatePrivateList();
}

function closePrivateWindow(chatId) { const c=S.privateChats[chatId]; if(c?.windowEl) c.windowEl.style.display='none'; }
function sendPrivateMsg(chatId) { const inp=document.getElementById('pwi-'+chatId); const text=inp.value.trim(); if(!text)return; S.socket.emit('private:message',{chatId,text}); inp.value=''; }

async function sendPrivateImage(chatId, input) {
  const file = input.files[0]; if(!file) return;
  if(file.size > 2*1024*1024){ alert('Imagen muy grande, máximo 2MB'); input.value=''; return; }
  const btn = input.parentElement;
  const prev = btn.childNodes[0].textContent;
  btn.childNodes[0].textContent = '⏳';
  try {
    const res = await fetch('/api/upload-image', { method:'POST', headers:{'Content-Type': file.type}, body: file });
    const data = await res.json();
    if(!res.ok){ alert('Error: ' + (data.error||'No se pudo subir')); return; }
    S.socket.emit('private:message', { chatId, imageId: data.imageId });
  } catch(e) { alert('Error al subir imagen'); }
  finally { btn.childNodes[0].textContent = prev; input.value = ''; }
}

function handlePrivateMessage(chatId, msg) {
  if(!S.privateChats[chatId]?.windowEl) openPrivateWindow(chatId,msg.nick,msg.color,[]);
  appendPrivateMsg(chatId,msg);
  scrollBottom(document.getElementById('pwm-'+chatId));
  if(msg.nick!==S.myNick&&S.privateChats[chatId]){ S.privateChats[chatId].unread=(S.privateChats[chatId].unread||0)+1; updatePrivateList(); }
}

function appendPrivateMsg(chatId, msg) {
  const el=document.getElementById('pwm-'+chatId); if(!el)return;
  const d=document.createElement('div'); d.className='pw-msg';

  if(msg.imageId) {
    const ttl = Math.max(0, Math.round((msg.expiresAt - Date.now()) / 1000));
    d.innerHTML=`<span class="pw-msg-nick" style="color:${esc(msg.color)}">${esc(msg.nick)}:</span>
      <div class="pw-img-wrap">
        <img class="pw-temp-img" src="/api/image/${esc(msg.imageId)}" alt="imagen temporal"
          onerror="this.parentElement.innerHTML='<span class=pw-img-expired>🔥 Imagen expirada</span>'"/>
        <div class="pw-img-timer" id="pwtimer-${esc(msg.imageId)}">🔥 ${ttl}s</div>
      </div>`;
    el.appendChild(d);
    const interval = setInterval(() => {
      const timerEl = document.getElementById('pwtimer-'+msg.imageId);
      const remaining = Math.max(0, Math.round((msg.expiresAt - Date.now()) / 1000));
      if(timerEl) timerEl.textContent = '🔥 '+remaining+'s';
      if(remaining <= 0) {
        clearInterval(interval);
        const imgEl = d.querySelector('.pw-temp-img');
        if(imgEl) imgEl.parentElement.innerHTML = '<span class="pw-img-expired">🔥 Imagen expirada</span>';
      }
    }, 1000);
  } else {
    d.innerHTML=`<span class="pw-msg-nick" style="color:${esc(msg.color)}">${esc(msg.nick)}:</span> <span class="pw-msg-text">${esc(msg.text)}</span>`;
    el.appendChild(d);
  }
}

function showIncomingPrivate(chatId, fromNick, fromColor) {
  if(document.getElementById('pw-incoming-'+chatId)) return;
  const div=document.createElement('div'); div.className='pw-incoming'; div.id='pw-incoming-'+chatId;
  div.innerHTML=`<div class="pw-incoming-text"><strong>${esc(fromNick)}</strong> quiere chatear en privado 💬</div>
    <div class="pw-incoming-btns">
      <button class="pw-accept" onclick="acceptPrivate('${chatId}','${esc(fromNick)}','${esc(fromColor)}')">✅ Aceptar</button>
      <button class="pw-reject" onclick="rejectPrivate('${chatId}')">❌ Rechazar</button>
    </div>`;
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),20000);
}

function acceptPrivate(chatId, fromNick) { document.getElementById('pw-incoming-'+chatId)?.remove(); S.socket.emit('private:accept',{chatId,fromNick}); }
function rejectPrivate(chatId) { document.getElementById('pw-incoming-'+chatId)?.remove(); }

function updatePrivateList() {
  const list=document.getElementById('privateList'); list.innerHTML='';
  let any=false;
  Object.entries(S.privateChats).forEach(([chatId,chat])=>{
    if(!chat.toNick)return; any=true;
    const d=document.createElement('div'); d.className='priv-tab';
    d.innerHTML=`<span style="font-size:14px">💬</span><span class="pnick" style="color:${esc(chat.toColor||'#AAAAFF')}">${esc(chat.toNick)}</span>${chat.unread?`<span class="punread">${chat.unread}</span>`:''}`;
    d.onclick=()=>{ chat.unread=0; updatePrivateList(); if(chat.windowEl){chat.windowEl.style.display='flex';scrollBottom(document.getElementById('pwm-'+chatId));}else startPrivateChat(chat.toNick); };
    list.appendChild(d);
  });
  if(!any) list.innerHTML='<div class="rp-empty">Haz clic en un usuario</div>';
}

// ─── DRAGGABLE ───────────────────────────────────────────────────────────────
function makeDraggable(el, handleId) {
  const h=document.getElementById(handleId); if(!h)return;
  let ox,oy,sx,sy,drag=false;
  h.addEventListener('mousedown',e=>{drag=true;sx=e.clientX;sy=e.clientY;const r=el.getBoundingClientRect();ox=r.left;oy=r.top;el.style.right='auto';el.style.bottom='auto';el.style.left=ox+'px';el.style.top=oy+'px';});
  document.addEventListener('mousemove',e=>{if(!drag)return;el.style.left=(ox+e.clientX-sx)+'px';el.style.top=(oy+e.clientY-sy)+'px';});
  document.addEventListener('mouseup',()=>{drag=false;});
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────
function openAdmin() { document.getElementById('adminModal').style.display='flex'; S.socket.emit('admin:request_stats'); }
function closeAdmin() { document.getElementById('adminModal').style.display='none'; }
function closeAdminIfBg(e) { if(e.target===document.getElementById('adminModal'))closeAdmin(); }
function switchAdminTab(name,btn) { document.querySelectorAll('.atab-content').forEach(el=>el.classList.remove('active')); document.querySelectorAll('.atab').forEach(el=>el.classList.remove('active')); document.getElementById('atab-'+name).classList.add('active'); btn.classList.add('active'); if(name==='stats')S.socket.emit('admin:request_stats'); }

let adminData=null;
function renderAdminStats(data) { adminData=data; renderAdminUsers(data.users); renderAdminRooms(data.rooms); renderAdminStatsCards(data.stats); renderAdminBans(data.banned,data.muted); }

function renderAdminUsers(users) {
  const tbody=document.getElementById('adminUsersTbody'); if(!tbody)return;
  const q=document.getElementById('adminUserSearch')?.value.toLowerCase()||'';
  tbody.innerHTML='';
  users.filter(u=>u.nick.toLowerCase().includes(q)).forEach(u=>{
    const isMuted=adminData?.muted?.includes(u.nick.toLowerCase());
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><span style="color:${esc(u.color)};font-weight:700">${esc(u.nick)}</span>${u.isAdmin?'<span class="badge-admin">ADMIN</span>':''}</td>
      <td>${esc(u.room)}</td><td>${esc(u.mood||'😊')}</td>
      <td><span class="badge-online">ONLINE</span>${isMuted?'<span class="badge-muted">MUTED</span>':''}</td>
      <td>
        <button class="admin-btn" onclick="adminKick('${esc(u.nick)}')">🚫 Kick</button>
        <button class="admin-btn" style="color:#f87171" onclick="adminBan('${esc(u.nick)}')">⛔ Ban</button>
        ${isMuted?`<button class="admin-btn" onclick="adminUnmute('${esc(u.nick)}')">🔊 Unmute</button>`:`<button class="admin-btn" onclick="adminMute('${esc(u.nick)}')">🔇 Mute</button>`}
      </td>`;
    tbody.appendChild(tr);
  });
}

function filterAdminUsers() { if(adminData)renderAdminUsers(adminData.users); }

function renderAdminRooms(rooms) {
  const tbody=document.getElementById('adminRoomsTbody'); if(!tbody)return;
  tbody.innerHTML='';
  Object.values(rooms).forEach(r=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td style="font-weight:700;color:var(--text-hi)">${esc(r.name)}</td><td style="color:var(--text-lo)">${esc(r.description||'')}</td>
      <td><span class="badge-online">${r.online}</span></td><td>${r.msgCount}</td>
      <td>${r.name!=='Capibara Central 🐾'?`<button class="admin-btn" style="color:#f87171" onclick="adminDeleteRoom('${esc(r.name)}')">🗑 Borrar</button>`:'<span style="color:var(--text-lo);font-size:10px">Principal</span>'}</td>`;
    tbody.appendChild(tr);
  });
}

function renderAdminStatsCards(stats) {
  const g=document.getElementById('statsGrid'); if(!g)return;
  const upSec=stats.uptime||0;
  g.innerHTML=`
    <div class="stat-card"><div class="stat-label">Online ahora</div><div class="stat-value">${stats.onlineNow||0}</div></div>
    <div class="stat-card"><div class="stat-label">Total mensajes</div><div class="stat-value">${stats.totalMessages||0}</div></div>
    <div class="stat-card"><div class="stat-label">Total ingresos</div><div class="stat-value">${stats.totalUsers||0}</div></div>
    <div class="stat-card"><div class="stat-label">Uptime</div><div class="stat-value" style="font-size:18px">${Math.floor(upSec/3600)}h ${Math.floor((upSec%3600)/60)}m</div></div>`;
}

function renderAdminBans(banned) {
  const tbody=document.getElementById('adminBansTbody'); if(!tbody)return;
  tbody.innerHTML='';
  (banned||[]).forEach(nick=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td style="color:#f87171">${esc(nick)} <span class="badge-banned">BANEADO</span></td><td><button class="admin-btn" onclick="adminUnban('${esc(nick)}')">✅ Desbanear</button></td>`;
    tbody.appendChild(tr);
  });
  if(!banned?.length){const tr=document.createElement('tr');tr.innerHTML='<td colspan="2" style="color:var(--text-lo);text-align:center;padding:16px">Sin baneados</td>';tbody.appendChild(tr);}
}

function adminKick(nick){if(confirm('Expulsar a '+nick+'?'))S.socket.emit('admin:kick',{targetNick:nick});}
function adminBan(nick){if(confirm('Banear a '+nick+'?'))S.socket.emit('admin:ban',{targetNick:nick});}
function adminMute(nick){S.socket.emit('admin:mute',{targetNick:nick});}
function adminUnmute(nick){S.socket.emit('admin:unmute',{nick});}
function adminUnban(nick){S.socket.emit('admin:unban',{nick});}
function adminManualBan(){const n=document.getElementById('manualBanNick').value.trim();if(!n)return;S.socket.emit('admin:ban',{targetNick:n});document.getElementById('manualBanNick').value='';}
function adminBroadcast(){const m=document.getElementById('broadcastMsg').value.trim();if(!m)return;S.socket.emit('admin:broadcast',{text:m});document.getElementById('broadcastMsg').value='';alert('✅ Enviado');}
function adminCreateRoom(){const n=document.getElementById('newRoomName').value.trim();const d=document.getElementById('newRoomDesc').value.trim();if(!n)return;S.socket.emit('admin:create_room',{name:n,description:d});document.getElementById('newRoomName').value='';document.getElementById('newRoomDesc').value='';}
function adminDeleteRoom(name){if(confirm('¿Borrar sala "'+name+'"?'))S.socket.emit('admin:delete_room',{name});}

// ─── BOOT ────────────────────────────────────────────────────────────────────
(function init() {
  makeStars('loginStars', 70);
  document.getElementById('loginCapy').innerHTML = capySVG('#8B5E3C','#7c3aed',0,0);
  loadRoomsForLogin();
  fetch('/api/rooms').then(r=>r.json()).then(rooms=>{
    let t=0; Object.values(rooms).forEach(r=>t+=(r.online||0));
    document.getElementById('loginOnline').textContent=t;
  }).catch(()=>{});
  document.getElementById('loginNick').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
  document.getElementById('loginPass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
})();
