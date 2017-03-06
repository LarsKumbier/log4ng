import { Injectable, Inject } from '@angular/core';
import * as recipients from './recipients';
import { LogFilters, ILogFilter } from './filters';
import { ILog4ngServiceConfig } from './i-logging-service-config';
import { Message, Level } from './message';


/**
 * FIXME: NOT doing anything should be made explicit by screaming loudly
 * The same behaviour can be reached by DummyWriter and PassFilter
 */
export const LOG4NG_SERVICE_CONFIG: ILog4ngServiceConfig = {
  recipients: [],
  filters: []
};


@Injectable()
export class Log4ngService {
  protected recipients: Array<recipients.Recipient> = [];
  protected filters: LogFilters;


  constructor(@Inject(LOG4NG_SERVICE_CONFIG) config: ILog4ngServiceConfig) {
    this.filters = new LogFilters();
    if (!!config) {
      this.addRecipientsFromConfig(config.recipients);
      this.filters.addFiltersByConfig(config.filters);
    }
  }


  public addFiltersByConfig(config: any): this {
    this.filters.addFiltersByConfig(config);
    return this;
  }


  public addFilterByConfig(config: any): this {
    this.filters.addFilterByConfig(config);
    return this;
  }


  public addFilter(filter: ILogFilter): this {
    this.filters.addFilter(filter);
    return this;
  }


  public addRecipientsFromConfig(config: recipients.RecipientConfig[]): this {
    if (!!!config) {
      return this;
    }

    for (const entry of config) {
      this.addRecipientFromConfig(entry);
    }
    return this;
  }


  public addRecipientFromConfig(config: recipients.RecipientConfig): this {
    const writer = config.params
        ? new recipients[config.classname](config.params)
        : new recipients[config.classname]();
    this.addRecipient(writer);
    return this;
  }


  public addRecipient(recipient: recipients.Recipient): this {
    this.recipients.push(recipient);
    return this;
  }


  /**
   * FIXME: MyError should be a special case of a Message, so that this
   * method is just a proxy-method for log()
   */
  public logError(error: any): this {
    const msg = new Message(error.message + error.stack, Level.Error);
    if (!this.filters.passesFilters(msg)) {
      return this;
    }

    for (const writer of this.recipients) {
      writer.logError(error);
    }

    return this;
  }


  public log(thing: any, level?: Level): this {
    if (typeof thing !== 'string' && !(thing instanceof Array)) {
      thing = thing.toString();
    }
    const message = new Message(thing, level);
    this.sendToRecipients(message);

    return this;
  }


  protected sendToRecipients(message: Message): void {
    if (!this.filters.passesFilters(message)) {
      return;
    }

    for (const recipient of this.recipients) {
      recipient.log(message);
    }
  }
}


export const LOG4NG_SERVICE_HANDLER_PROVIDERS = [
  {
    provide: LOG4NG_SERVICE_CONFIG,
    useValue: LOG4NG_SERVICE_CONFIG
  },
  Log4ngService
];
