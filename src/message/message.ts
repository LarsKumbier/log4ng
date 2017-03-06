import { Level } from './level';

export class Message {
  // FIXME: no array, bad idea, wtf were you thinking.
  protected _messages: string[] = [];
  protected _level: Level = Level.Undecided;

  constructor(messages: string|string[], level?: Level) {
    if (messages instanceof Array) {
      for (const message of messages) {
        this.addMessage(message);
      }
    } else {
      this.addMessage(messages);
    }

    if (!!level) {
      if (typeof Level[level] === 'undefined') {
        throw new Error('Cannot instantiate with an invalid level');
      }
      this._level = level;
    }
  }

  protected addMessage(message: any): void {
    if (typeof message !== 'string') {
      message = message.toString();
    }
    this._messages.push(message);
  }

  get messages(): string[] {
    return this._messages;
  }

  get message(): string {
    return this._messages.toString();
  }

  get level(): Level {
    return this._level;
  }
}
