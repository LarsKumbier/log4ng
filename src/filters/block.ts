import { ILogFilter } from '.';
import { Message } from '../message';

export class Block implements ILogFilter {
  constructor(public config?: any) {}

  shouldBeLogged(message: Message): boolean {
    return false;
  }
}
