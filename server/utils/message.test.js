const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {
    const input = { from: 'josh', text: 'Hello World!', createdAt: 0};
    const message = generateMessage(input.from, input.text);
    expect(message.createdAt).toBeA('number');
    expect(message).toIncludeKeys(Object.keys(input));
    expect(message.from).toBeA('string').toBe(input.from);
    expect(message.text).toBeA('string').toBe(input.text);
  });
});
