import {} from 'jasmine';
import { Message, Level } from '../message';
import { HasMinLevel } from './has-min-level';

const INVALID_LEVEL = Level.Error + 1;

describe('HasMinLevel', () => {
  it('should filter the correct message levels', () => {
    const filter = new HasMinLevel({minLevel: Level.Warn});
    expect(filter.shouldBeLogged(new Message('x', Level.Log))).toBe(false);
    expect(filter.shouldBeLogged(new Message('x', Level.Debug))).toBe(false);
    expect(filter.shouldBeLogged(new Message('x', Level.Info))).toBe(false);
    expect(filter.shouldBeLogged(new Message('x', Level.Warn))).toBe(true);
    expect(filter.shouldBeLogged(new Message('x', Level.Error))).toBe(true);
  });

  it('should not be possible to instantiate with invalid level', () => {
    let passed = false;
    try {
      new HasMinLevel({minLevel: INVALID_LEVEL});
    } catch (e) {
      passed = true;
    }
    expect(passed).toBe(true);
  });
});
