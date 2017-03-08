import { Message } from '../message';

export interface Recipient {
  log(message: Message): this;
}
