const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should return message object', () => {

    let from = 'Daniel';
    let text = 'I just wanted you to know that you are loved';
    let returnedMsg = generateMessage(from, text);

    expect(returnedMsg).toMatchObject({
      from: from,
      text: text,
      createdAt: expect.any(Number)
    });

  });
});