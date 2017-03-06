import { Message } from '../message';

export interface Recipient {
  logError(error: Error): this;
  log(message: Message): this;
}
