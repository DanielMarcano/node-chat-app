const socket = io({ transports: ['websocket'], upgrade: false });

const rooms = document.getElementById('rooms');
const room = document.getElementById('room');
const color = document.getElementById('color');

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

room.addEventListener('input', function(e) {
  if (e.target.value.trim() !== '') {
    rooms.setAttribute('disabled', '');
  } else {
    rooms.removeAttribute('disabled');
  }
});

let picker = document.getElementById('picker');
let colorPicker = document.getElementById('color-picker');
let colorName = document.getElementById('color-name');
let colorsTemplate = document.getElementById('colors-template').innerHTML;

picker.addEventListener('click', function(e) {

  if (picker.className === 'no-picker') {
    let html = Mustache.to_html(colorsTemplate, { colors: ['#FC60A8', '#0FA3B1', '#6369D1', '#48E5C2', '#FF1654', '#E4572E', '#E8098E'] });
    colorPicker.innerHTML = html;
    colorName.innerText = 'Pick One';
    picker.className = 'picker';
    colorPicker.style.display = 'flex';
  }
  colors = document.querySelectorAll('li[data-color]');

  [...colors].forEach(function(value, key) {
    let color = value.getAttribute('data-color');
    colors[key].childNodes[1].style.backgroundColor = color;
    colors[key].addEventListener('click', colorsEventListener);
  });
});

const colorsEventListener = function(event) {
  event.stopPropagation();
  let color = event.target.parentNode.getAttribute('data-color');
  let input = $(`<input type="text" value="${color}" name="color">`);
  $('#selected-color').html(input);
  $(input).hide();
  picker.className = 'no-picker';
  colorPicker.style.display = 'none';
  colorName.innerText = color;
  picker.style.borderColor = color;
};