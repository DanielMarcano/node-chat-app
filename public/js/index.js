let socket = io();

socket.on('newMessage', function(message) {
  console.log('You got a new message', message);
});

let message = document.getElementById("message");
let writing = document.getElementById("writing");
let send = document.getElementById("send");

send.addEventListener('click', function(event) {
  event.preventDefault();
});

message.addEventListener('focus', function(event) {
  toggleWritingIcon(false);
});

message.addEventListener('input', function() {
  toggleWritingIcon(false);
  writing.style.setProperty('--myColor', 'red');
});

message.addEventListener('blur', function() {
  toggleWritingIcon(false);
});

const toggleWritingIcon = invert => {
  if (message.value === '') {
    writing.style.display = invert ? 'block' : 'none';
  } else {
    writing.style.display = invert ? 'none' : 'block';
  }
};