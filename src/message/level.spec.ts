import {} from 'jasmine';
import { Level } from './level';

const VALID_LEVEL = Level.Error;
const INVALID_LEVEL = Level.Error + 1;

describe('Level', () => {
  it('should not be possible to set an invalid level', () => {
    expect(Level[VALID_LEVEL]).toBeTruthy();
    expect(typeof Level[INVALID_LEVEL]).toBe('undefined');
  });
});
