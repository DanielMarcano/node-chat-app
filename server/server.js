const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const { generateMessage } = require('./utils/message');

app.use(express.static(path.join(publicPath)));

io.on('connection', socket => {
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
  socket.emit('newMessage', generateMessage('Admin', 'Greetings, new user'));

  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });
  socket.on('createMessage', function(message) {
    let newMessage = _.pick(message, ['from', 'text']);
    newMessage.createdAt = new Date().getTime();
    io.emit('newMessage', newMessage);
  });

});

http.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});