const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const { generateMessage, generateLocationMessage, messageTemplate, locationMessageTemplate } = require('./utils/message');
const mustache = require('mustache');

app.use(express.static(path.join(publicPath)));

io.on('connection', socket => {

  let newUser = generateMessage('Admin', 'New user joined!');
  let greeting = generateMessage('Admin', 'Greetings, new user');

  socket.broadcast.emit('newMessage', mustache.to_html(messageTemplate, newUser));
  socket.emit('newMessage', mustache.to_html(messageTemplate, greeting));

  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });

  socket.on('createLocationMessage', ({ latitude, longitude }, enableButton) => {
    let locationMessage = generateLocationMessage('Admin', latitude, longitude);
    let template = mustache.render(locationMessageTemplate, locationMessage);
    io.emit('newMessage', template);
    enableButton();
  });

  socket.on('createMessage', function({ from, text }, callback) {
    let userMessage = generateMessage(from, text);
    let template = mustache.to_html(messageTemplate, userMessage);
    io.emit('newMessage', template);
    callback();
  });

});

http.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});