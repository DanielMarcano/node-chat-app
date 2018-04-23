const socket = io({ transports: ['websocket'], upgrade: false });

const rooms = document.getElementById('rooms');
const room = document.getElementById('room');

socket.on('updateRooms', function(roomOptions) {
  rooms.innerHTML = roomOptions;

  let options = document.getElementsByTagName('option');
  if (options.length <= 1) {
    rooms.setAttribute('disabled', '');
    options[0].innerHTML = 'No other rooms';
  } else {
    rooms.removeAttribute('disabled');
  }
});

rooms.addEventListener('change', function(e) {
  if (e.target.value !== 'Pick a room') {
    room.setAttribute('disabled', '');
  } else {
    room.removeAttribute('disabled');
  }
});