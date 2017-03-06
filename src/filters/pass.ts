import { ILogFilter } from '.';
import { Message } from '../message';

export class Pass implements ILogFilter {
  constructor(public config?: any) {}

  shouldBeLogged(message: Message): boolean {
    return true;
  }
}
