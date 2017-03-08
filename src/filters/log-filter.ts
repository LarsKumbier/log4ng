import { Message } from '../message';

export interface LogFilter {
  shouldBeLogged(message: Message): boolean;
}
