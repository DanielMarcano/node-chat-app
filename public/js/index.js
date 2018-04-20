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

socket.on('newLocationMessage', function(message) {
  let li = document.createElement('li');
  let from = document.createTextNode(`${message.from}: `);
  li.appendChild(from);

  let url = document.createElement('a');
  url.setAttribute('href', message.url);
  url.setAttribute('target', '_blank');
  let urlMsg = document.createTextNode('My current location');
  url.appendChild(urlMsg);
  li.appendChild(url);

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

  message.focus();

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

  let locationButton = document.getElementById('send-location');

  locationButton.addEventListener('click', e => {
    e.preventDefault();
    if (!navigator.geolocation) {
      return alert('Your browser does not support geolocation...');
    } else {
      navigator.geolocation.getCurrentPosition(positionHandler, errorHandler);
    }
  });

  const positionHandler = (position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  const errorHandler = error => {
    console.log('Error', error);
  };

});