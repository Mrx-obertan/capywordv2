# 🐾 CapyWorld Chat

Chat en tiempo real estilo LatinChat con capiguaras. Node.js + Socket.io.

## Estructura del proyecto

```
capyworld/
├── server.js              # Servidor principal (Express + Socket.io)
├── package.json
├── .env.example           # Configuración de entorno
├── .env                   # Tu config real (crearlo desde .env.example)
└── public/
    ├── index.html         # App frontend
    ├── css/
    │   └── style.css      # Estilos
    └── js/
        └── app.js         # Lógica frontend
```

## Instalación rápida

```bash
# 1. Clonar / descomprimir el proyecto
cd capyworld

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env
# Editar .env con tu editor favorito

# 4. Arrancar
npm start
# O en desarrollo con auto-reload:
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

## Variables de entorno (.env)

| Variable        | Default           | Descripción                          |
|-----------------|-------------------|--------------------------------------|
| PORT            | 3000              | Puerto del servidor                  |
| ADMIN_USER      | admin             | Nick del administrador               |
| ADMIN_PASSWORD  | capyadmin2024     | Contraseña del admin                 |
| NODE_ENV        | production        | Entorno (production / development)   |

## Acceso como Administrador

1. En la pantalla de login, escribe el nick configurado en `ADMIN_USER` (por defecto: `admin`)
2. En el campo de contraseña, escribe el valor de `ADMIN_PASSWORD`
3. Tendrás acceso al Panel de Administración desde el botón en el panel derecho

## Funcionalidades

### Chat público
- Salas múltiples con pestañas
- Mensajes en tiempo real (Socket.io)
- Historial de los últimos 50 mensajes al entrar
- Indicador de "está escribiendo..."
- Avatares capiguara únicos generados por nick
- Selector de mood/estado
- Mundo visual con capiguaras animadas
- Emojis rápidos

### Chat Privado
- Iniciar chat privado haciendo clic en cualquier usuario o en el mundo
- Ventanas flotantes arrastrables
- Notificación de chat entrante
- Historial de 100 mensajes por conversación
- Contador de mensajes no leídos

### Panel de Administración
- **Usuarios**: Ver todos los conectados, kick, ban, mute/unmute en tiempo real
- **Salas**: Crear y eliminar salas, ver usuarios y mensajes por sala
- **Stats**: Usuarios online, total mensajes, uptime del servidor
- **Baneados**: Lista de baneados, desbanear manualmente
- **Broadcast**: Enviar mensaje a TODOS los usuarios

## Deploy en producción

### Con PM2 (recomendado)
```bash
npm install -g pm2
pm2 start server.js --name capyworld
pm2 save
pm2 startup
```

### Con nginx como reverse proxy
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### En Railway / Render / Fly.io
1. Subir el código a GitHub
2. Conectar repo en la plataforma
3. Configurar variables de entorno en el dashboard
4. Deploy automático

### En VPS (Ubuntu)
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar y arrancar
git clone <tu-repo> capyworld
cd capyworld
npm install
cp .env.example .env
nano .env  # editar credenciales

# Con PM2
npm install -g pm2
pm2 start server.js --name capyworld
pm2 save && pm2 startup
```

## Personalización

### Cambiar salas por defecto
En `server.js`, modifica el Map `state.rooms`:
```js
const state = {
  rooms: new Map([
    ['Mi Sala 🎮', { name: 'Mi Sala 🎮', description: 'Gaming', msgCount: 0, locked: false }],
    // ...
  ]),
```

### Agregar más colores de nick
En `server.js`, en el array `NICK_COLORS`.

### Cambiar colores del tema
En `public/css/style.css`, las variables CSS en `:root`.

## Notas de seguridad para producción

- Cambia `ADMIN_PASSWORD` por algo seguro (mínimo 16 chars, aleatorio)
- Usa HTTPS en producción (nginx + certbot)
- El store es in-memory: los mensajes/bans se pierden al reiniciar. Para persistencia, considera agregar SQLite o Redis.
- Para escalar horizontalmente (múltiples instancias), usa socket.io-redis adapter

## Requisitos

- Node.js >= 16
- npm >= 7
- 128MB RAM mínimo (funciona con el plan gratuito de Railway/Render)
