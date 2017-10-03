const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin text welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // socket.broadcast.emit from Admin text new user joined

  socket.on('createMessage', (data, callback) => {
    console.log('Create Message');
    io.emit('newMessage', generateMessage(data.from, data.text));
    callback('This is from the server!');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
