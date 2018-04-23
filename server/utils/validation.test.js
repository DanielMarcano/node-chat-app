const expect = require('expect');
const { trimObject, joinSchema } = require('./validation');

describe('trimObject()', () => {
  it('should trim all values of an object', () => {
    let firstObj = {
      name: '   ddddd     ',
      username: '   daniel@gmail.com     '
    };
    let secondObj = { ...firstObj };
    trimObject(secondObj);
    expect(secondObj).not.toMatchObject(firstObj);

  });
});

describe('joinSchema', () => {

  it('should reject empty values', () => {
    let myObj = { name: '         ', room: '    ', id: '' };
    trimObject(myObj);
    let errs = joinSchema.validate(myObj);
    expect(errs.length).toBe(3);
  });

  it('should reject non-string values', () => {
    let myObj = { name: 324324, room: 1, id: 1 };
    trimObject(myObj);
    let errs = joinSchema.validate(myObj);
    expect(errs.length).toBe(3);
  });

  it('should accept valid object', () => {
    let myObj = { name: '         Daniel', room: '    The Red Room', id: '1' };
    trimObject(myObj);
    let errs = joinSchema.validate(myObj);
    expect(errs.length).toBe(0);
  });
});