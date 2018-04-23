let socket = io({ transports: ['websocket'], upgrade: false });

const messages = document.getElementById("messages");
const message = document.getElementById("message");
const writing = document.getElementById("writing");
const send = document.getElementById("send");
const locationButton = document.getElementById('send-location');
const users = document.getElementById('users');

socket.on('updateUsernames', function(usernames) {
  users.innerHTML = usernames;
  users.scrollTop = users.scrollHeight;
});

socket.on('connect', function() {
  let params = $.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
  });
});

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