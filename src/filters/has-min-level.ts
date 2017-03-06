import { Message, Level } from '../message';
import { ILogFilter } from './i-log-filter';

export interface HasMinLevelConfig {
  minLevel: Level;
}

export class HasMinLevel implements ILogFilter {
  protected _minLevel: Level;

  constructor(config: HasMinLevelConfig) {
    if (!!!config) {
      throw new Error('HasMinLevel requires a config object');
    }

    this.setMinLevel(config.minLevel);
  }

  protected setMinLevel(newLevel: Level) {
    if (typeof Level[newLevel] === 'undefined') {
      throw new Error(`Could not set invalid LogLevel of "${newLevel}"`);
    }
    this._minLevel = newLevel;
  }

  get minLevel(): Level {
    return this._minLevel;
  }

  public shouldBeLogged(message: Message): boolean {
    return message.level >= this.minLevel;
  }
}
