const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should return message object', () => {

    let from = 'Daniel';
    let text = 'I just wanted you to know that you are loved';
    let returnedMsg = generateMessage(from, text);

    expect(returnedMsg).toMatchObject({
      from,
      text,
      createdAt: expect.any(Number)
    });

  });
});

describe('generateLocationMessage', () => {
  it('should return location message object', () => {
    let from = 'Google Lover';
    let lat = '11111';
    let lng = '22222';
    let url = `https://www.google.com/maps?q=${lat},${lng}`;
    let returnedMsg = generateLocationMessage(from, lat, lng);

    expect(returnedMsg.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(returnedMsg).toMatchObject({
      from,
      url,
      createdAt: expect.any(Number)
    });

  });
});