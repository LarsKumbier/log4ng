import { Message, Level } from '../message';
import { LogFilter } from './log-filter';

export interface IsLevelConfig {
  levels: Level[];
}

export class IsLevel implements LogFilter {
  protected levels: Level[];

  constructor(config: IsLevelConfig) {
    if (!!!config) {
      throw new Error('IsLevel requires a config');
    }

    if (!!!config.levels) {
      throw new Error('IsLevel requires a config with an array of levels to look for: { levels: [1, 4] }');
    }

    this.levels = config.levels;
  }

  public shouldBeLogged(message: Message): boolean {
    return this.levels.some(level => level === message.level);
  }
}
