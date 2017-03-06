import {} from 'jasmine';
import { Message, Level } from '../message';
import { IsLevel } from './is-level';

describe('IsLevel', () => {
  it('should filter the correct message levels', () => {
    const filter = new IsLevel({levels: [Level.Info, Level.Warn]});
    expect(filter.shouldBeLogged(new Message('x', Level.Log))).toBe(false);
    expect(filter.shouldBeLogged(new Message('x', Level.Debug))).toBe(false);
    expect(filter.shouldBeLogged(new Message('x', Level.Info))).toBe(true);
    expect(filter.shouldBeLogged(new Message('x', Level.Warn))).toBe(true);
    expect(filter.shouldBeLogged(new Message('x', Level.Error))).toBe(false);
  });
});
