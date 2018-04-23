const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const { generateMessage, generateLocationMessage, messageTemplate, locationMessageTemplate } = require('./utils/message');
const { usersTemplate } = require('./utils/users');
const mustache = require('mustache');
const { users } = require('./utils/users');

app.use(express.static(path.join(publicPath)));

io.on('connection', socket => {

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat!`));
      users.removeUser(user.id);
      io.to(user.room).emit('updateUsernames', users.usersTemplate(user.room));
    }
  });

  socket.on('join', (params, errHandler) => {

    users.removeUser(socket.id);
    let user = users.addUser(socket.id, params['username'], params['room']);
    if (typeof user !== 'object') return errHandler(user);

    socket.join(user.room);
    socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has joined!`));
    socket.emit('newMessage', generateMessage('Admin', `${user.name}, welcome to our chat app!`));
    io.to(user.room).emit('updateUsernames', users.usersTemplate(user.room));

    errHandler();
  });

  socket.on('createLocationMessage', ({ latitude, longitude }, enableButton) => {
    let user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateLocationMessage(user.name, latitude, longitude));
    enableButton();
  });

  socket.on('createMessage', function({ from, text }, callback) {
    let user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateMessage(user.name, text));
    callback();
  });

});

http.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});