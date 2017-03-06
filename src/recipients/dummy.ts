import { Recipient, RecipientConfigParams } from '.';
import { Message } from '../message';

export class DummyRecipient implements Recipient {
  constructor(public config?: RecipientConfigParams) {}

  public logError(error: Error): this {
    return this;
  }

  public log(message: Message): this {
    return this;
  }
}
