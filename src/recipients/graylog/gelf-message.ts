import { Level } from '../../message';

export class GelfMessage {
  readonly version = '1.1';
  readonly host: string = window.location.href;
  readonly short_message: string;
  readonly long_message: string;
  readonly _application = 'idesk2-mobile';
  readonly level: Level;
  readonly _levelName: string;

  constructor(short_message: string, long_message?: string, level?: Level) {
    if (typeof short_message !== 'string') {
      throw new Error('GelfMessage MUST have a short_message');
    }
    this.short_message = short_message;
    this.long_message = long_message as string;

    if (level) {
      if (typeof Level[level] === 'undefined') {
        throw new Error(`Cannot assign a non-existant log-level of "${level}"`);
      }

      if (level !== Level.Undecided) {
        this.level = level;
        this._levelName = Level[level];
      }
    }
  }
}
