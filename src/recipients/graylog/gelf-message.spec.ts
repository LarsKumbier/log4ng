import {} from 'jasmine';
import { GelfMessage } from './gelf-message';
import { Level } from '../../message';

describe('GelfMessage', () => {
  it('should be possible to instantiate a GelfMessage with different parameters', () => {
    expect(new GelfMessage('x') instanceof GelfMessage).toBe(true);
    expect(new GelfMessage('x', 'x') instanceof GelfMessage).toBe(true);
    expect(new GelfMessage('x', 'x', Level.Undecided) instanceof GelfMessage).toBe(true);
    expect(new GelfMessage('x', null, Level.Undecided) instanceof GelfMessage).toBe(true);
  });

  it('should not be possible to instantiate a GelfMessage without a short_message', () => {
    let passed = false;
    try {
      new GelfMessage(null);
    } catch (e) {
      passed = true;
    }
    expect(passed).toBe(true);
  });

  it('should set a human-readable level, if a log-level-id is set', () => {
    const gelfMsg = new GelfMessage('x', null, Level.Info);
    expect(gelfMsg.level).toBe(Level.Info);
    expect(gelfMsg._levelName).toBe('Info');
  });

  it('should have a level or levelName, if a level is set', () => {
    const gelfMsgWith = new GelfMessage('x', 'y', Level.Info);
    const jsonWith = JSON.stringify(gelfMsgWith);
    expect(jsonWith.search('"level":')).not.toBe(-1);
    expect(jsonWith.search('"_levelName":')).not.toBe(-1);
  });

  it('should NOT have a level or levelName, if no level is set', () => {
    const gelfMsgWithout = new GelfMessage('x');
    const jsonWithout = JSON.stringify(gelfMsgWithout);
    expect(jsonWithout.search('"level":')).toBe(-1);
    expect(jsonWithout.search('"_levelName":')).toBe(-1);
  });
});
