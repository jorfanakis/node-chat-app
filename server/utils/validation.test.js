const expect = require('expect');

const {isRealString} = require('./validation');

describe('test realString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(123)).toBe(false);
  });
  it('should reject strings with all spaces', () => {
    expect(isRealString('  ')).toBe(false);
  });
  it('should allow strings with non-space characters', () => {
    expect(isRealString(' LOTR ')).toBe(true);
  });
});
