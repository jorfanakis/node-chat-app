const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const input = { from: 'josh', lat: 1, log: 1};
    const message = generateLocationMessage(input.from, input.lat, input.log);
    expect(message.createdAt).toBeA('number');
    expect(message).toIncludeKeys(['from', 'url', 'createdAt']);
    expect(message.from).toBeA('string').toBe(input.from);
    expect(message.url).toBeA('string').toBe(`https://www.google.com/maps?q=${input.lat},${input.log}`);
  });
});
