const validate = require('validate');
const _ = require('lodash');

exports.trimObject = object => {
  _.each(object, function(v, k) {
    if (typeof v === 'string') {
      object[k] = v.trim();
    }
  });
};

exports.joinSchema = new validate({
  id: {
    required: true,
    length: { min: 1 },
    type: 'string'
  },
  name: {
    required: true,
    length: { min: 1 },
    type: 'string'
  },
  room: {
    required: true,
    length: { min: 1 },
    type: 'string'
  },
  color: {
    type: 'string',
    length: { min: 1 }
  }
});