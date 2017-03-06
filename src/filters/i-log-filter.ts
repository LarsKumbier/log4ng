import { Message } from '../message';

export interface ILogFilter {
  shouldBeLogged(message: Message): boolean;
}
