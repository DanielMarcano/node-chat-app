const moment = require('moment');
const mustache = require('mustache');

exports.createMessage = (from, text, color) => {
  let message = {
    from,
    color,
    text,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
  return message;
};

exports.generateMessage = (from, text, color) => {
  let message = this.createMessage(from, text, color);
  return mustache.to_html(this.messageTemplate, message);
};

exports.messageTemplate = `
<li class="message">
  <section class="message__title">
    <h4 style='color: {{color}}'>{{from}}</h4>
    <span>{{format}}</span>
  </section>
  <section class="message__body">
    <p>{{text}}</p>
  </section>
 </li>
`;

exports.createLocationMessage = (from, latitude, longitude, color) => {
  let message = {
    from,
    color,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
  return message;
};

exports.generateLocationMessage = (from, latitude, longitude, color) => {
  let message = this.createLocationMessage(from, latitude, longitude, color);
  return mustache.to_html(this.locationMessageTemplate, message);
};

exports.locationMessageTemplate = `
<li class="message">
  <section class="message__title">
    <h4 style='color: {{color}}'>{{from}}</h4>
    <span>{{format}}</span>
  </section>
  <section class="message__body">
    <p>
      <a target="_blank" href="{{url}}">My current location</a>
    </p>
  </section>
 </li>
`;