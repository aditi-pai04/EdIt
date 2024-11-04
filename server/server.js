// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
  },
});

app.use(cors());

const PORT = 5000;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a document room
  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
    console.log(`User joined document: ${documentId}`);
  });

  // Listen for changes and broadcast to other users
  socket.on('sendChanges', ({ documentId, delta }) => {
    socket.to(documentId).emit('receiveChanges', delta);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
