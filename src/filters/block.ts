import { LogFilter } from './log-filter';
import { Message } from '../message';

export class Block implements LogFilter {
  constructor(public config?) {}

  shouldBeLogged(message: Message): boolean {
    return false;
  }
}
