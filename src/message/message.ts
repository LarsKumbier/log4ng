import { Level } from './level';

export class Message {
  protected _message: string;
  protected _level: Level = Level.Undecided;

  constructor(message: string, level?: Level) {
    this.addMessage(message);

    if (!!level) {
      if (typeof Level[level] === 'undefined') {
        throw new Error('Cannot instantiate with an invalid level');
      }
      this._level = level;
    }
  }

  protected addMessage(message: string): void {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }

  get level(): Level {
    return this._level;
  }
}
