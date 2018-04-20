let socket = io();

let messages = document.getElementById("messages");
let message = document.getElementById("message");
let writing = document.getElementById("writing");
let send = document.getElementById("send");

socket.on('newMessage', function(message) {
  let li = document.createElement('li');
  let text = document.createTextNode(`${message.from}: ${message.text}`);
  li.appendChild(text);

  let shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;

  messages.appendChild(li);

  if (shouldScroll) {
    messages.scrollTop = messages.scrollHeight;
  }
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

$(function() {
  $('#message-form').submit(function(e) {
    e.preventDefault();
    if (message.value === '') {
      message.focus();
      return false;
    }
    socket.emit('createMessage', {
      from: 'User',
      text: message.value
    }, function() {
      message.value = '';
      message.blur();
      message.focus();
    });
    $(send).click(function(e) {
      send.style.color = 'black';
    });
  });
});