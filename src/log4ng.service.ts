import { ErrorHandler, Injectable, Optional } from '@angular/core';

import { Log4ngServiceConfig } from './log4ng.service.config';
import * as recipients from './recipients';
import { ErrorMessage, Level, Message } from './message';
import { LogFilters, LogFilter, LogFilterConfig } from './filters';


@Injectable()
export class Log4ngService implements ErrorHandler {
  protected config: Log4ngServiceConfig;
  protected recipients: Array<recipients.Recipient> = [];
  protected filters: LogFilters;


  constructor(@Optional() config?: Log4ngServiceConfig) {
    this.filters = new LogFilters();
    if (config) {
      this.config = config;
      this.addRecipientsFromConfig(config.recipients);
      this.filters.addFiltersByConfig(config.filters);
    }
  }


  public addRecipientsFromConfig(config?: recipients.RecipientConfig[]): this {
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


  public addFiltersByConfig(config): this {
    this.filters.addFiltersByConfig(config);
    return this;
  }


  public addFilterByConfig(config): this {
    this.filters.addFilterByConfig(config);
    return this;
  }


  public addFilter(filter: LogFilter): this {
    this.filters.addFilter(filter);
    return this;
  }


  public handleError(error: Error): void {
    error = this.config.unwrapError ? this.findOriginalError(error) : error;

    this.sendToRecipients(new ErrorMessage(error));

    if (this.config.rethrowError) {
      throw error;
    }
  }


  public log(thing: any, level?: Level): this {
    if (typeof thing !== 'string') {
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


  protected findOriginalError( error: any ): any {
    while ( error && error.ngOriginalError ) {
      error = error.ngOriginalError;
    }
    return( error );
  }
}
