const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(publicPath)));

io.on('connection', socket => {
  console.log('Connected to client');
  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

http.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});