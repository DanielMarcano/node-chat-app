let socket = io();

let messages = document.getElementById("messages");
let message = document.getElementById("message");
let writing = document.getElementById("writing");
let send = document.getElementById("send");
let locationButton = document.getElementById('send-location');

socket.on('newMessage', function(message) {

  let lastElementHeight;

  if (document.querySelector('li.message')) {
    lastElementHeight = document.querySelector('li.message:last-child').clientHeight;
  }

  let shouldScroll = messages.scrollTop + messages.clientHeight + lastElementHeight >= messages.scrollHeight;

  messages.insertAdjacentHTML('beforeend', message);

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

  locationButton.addEventListener('click', e => {
    e.preventDefault();
    if (!navigator.geolocation) {
      message.focus();
      return alert('Your browser does not support geolocation...');
    } else {
      locationButton.innerHTML = 'Sending Location';
      locationButton.setAttribute('disabled', '');
      locationButton.className = 'disabled';
      navigator.geolocation.getCurrentPosition(positionHandler, errorHandler);
      message.focus();
    }
  });

  const positionHandler = (position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function() {
      locationButton.innerHTML = 'Send Location';
      locationButton.className = '';
      locationButton.removeAttribute('disabled');
    });
  };

  const errorHandler = error => {
    locationButton.innerHTML = 'Send Location';
    alert('Unable to fetch location.');
  };

});