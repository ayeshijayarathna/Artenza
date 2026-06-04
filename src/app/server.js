const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Socket.io Setup
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    path: '/api/socket',
  });

  // Store io instance globally so API routes can emit events
  global.io = io;

  // Socket.io Connection Handler
  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // User joins their personal room (userId-based)
    socket.on('join', ({ userId, role }) => {
      socket.join(`user:${userId}`);
      if (role === 'admin') {
        socket.join('admin'); // Admin joins admin room
      }
      console.log(`[Socket.io] User ${userId} joined room user:${userId}`);
    });

    // Admin joins admin room
    socket.on('join-admin', () => {
      socket.join('admin');
      console.log(`[Socket.io] Admin joined admin room`);
    });

    // Client acknowledges notification read
    socket.on('notification-read', ({ notificationId }) => {
      console.log(`[Socket.io] Notification ${notificationId} marked read`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  // Socket.io Emitter Helpers (used from API routes) 
  // These are exported via global.io — call from anywhere:
  // global.io.to(`user:${userId}`).emit('notification', payload)
  // global.io.to('admin').emit('new-order', payload)

  httpServer.listen(PORT, () => {
    console.log(` Artenza server running on http://localhost:${PORT}`);
    console.log(` Socket.io ready on ws://localhost:${PORT}/api/socket`);
  });
});