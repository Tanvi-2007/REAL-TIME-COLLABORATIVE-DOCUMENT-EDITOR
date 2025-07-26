const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
 
const app = express();
app.use(cors());
 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST']
  }
});
 
let documentContent = '';
 
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
 
  // Send current doc content to the new client
  socket.emit('load-document', documentContent);
 
  // Broadcast changes
  socket.on('send-changes', (newContent) => {
    documentContent = newContent;
    socket.broadcast.emit('receive-changes', newContent);
  });
});
 
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});