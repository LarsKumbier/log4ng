import { LogFilter } from '.';
import { Message } from '../message';

export class Pass implements LogFilter {
  constructor(public config?) {}

  shouldBeLogged(message: Message): boolean {
    return true;
  }
}
