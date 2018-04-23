const moment = require('moment');
const mustache = require('mustache');

exports.createMessage = (from, text) => {
  let message = {
    from,
    text,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
  return message;
};

exports.generateMessage = (from, text) => {
  let message = this.createMessage(from, text);
  return mustache.to_html(this.messageTemplate, message);
};

exports.messageTemplate = `
<li class="message">
  <section class="message__title">
    <h4>{{from}}</h4>
    <span>{{format}}</span>
  </section>
  <section class="message__body">
    <p>{{text}}</p>
  </section>
 </li>
`;

exports.createLocationMessage = (from, latitude, longitude) => {
  let message = {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
  return message;
};

exports.generateLocationMessage = (from, latitude, longitude) => {
  let message = this.createLocationMessage(from, latitude, longitude);
  return mustache.to_html(this.locationMessageTemplate, message);
};

exports.locationMessageTemplate = `
<li class="message">
  <section class="message__title">
    <h4>{{from}}</h4>
    <span>{{format}}</span>
  </section>
  <section class="message__body">
    <p>
      <a href="{{url}}">My current location</a>
    </p>
  </section>
 </li>
`;