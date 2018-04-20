const moment = require('moment');

exports.generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    },
    secondFormat: function() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
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

exports.generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
    format() {
      return moment(this.createdAt).format('h:mm a');
    }
  };
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