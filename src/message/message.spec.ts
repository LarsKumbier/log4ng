import {} from 'jasmine';
import { Message, Level } from '.';

const INVALID_LEVEL = Level.Error + 1;

describe('Message', () => {
  it('should be possible to create message with valid message-string and optional level', () => {
    expect(new Message('x', Level.Log) instanceof Message).toBe(true);
    expect(new Message('x', Level.Error) instanceof Message).toBe(true);
  });

  it('should have a valid level, if no level is given', () => {
    const valid = new Message('X');
    expect(valid.level).toBe(Level.Undecided);
  });

  it('should not be possible to create a message with an invalid Level', () => {
    let passed = false;
    try {
      new Message('x', INVALID_LEVEL);
    } catch (x) {
      passed = true;
    }
    expect(passed).toBe(true);
  });

  it('should be possible to create a message with multiple messages inside', () => {
    const msg1 = 'part A';
    const msg2 = 'part B';
    const sut = new Message([msg1, msg2]);
    expect(sut.messages).toEqual([msg1, msg2]);
  });
});
