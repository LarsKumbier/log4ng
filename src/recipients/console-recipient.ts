import { Recipient } from './recipient';
import { RecipientConfigParams } from './recipient-config';
import { Message, Level } from '../message';
import { LogFilters, Block } from '../filters';

export class ConsoleRecipient implements Recipient {
  protected name: string;
  protected filters: LogFilters;
  protected consoleFn: any;

  constructor(config?: RecipientConfigParams) {
    this.filters = new LogFilters();
    if (!!config) {
      if (!!config.name) {
        this.name = config.name;
      }

      if (!!config.filters) {
        this.filters.addFiltersByConfig(config.filters);
      }
    }

    this.initConsole(config);
  }


  protected initConsole(config: RecipientConfigParams): this {
    if (!!config && !!config.consoleFn) {
      this.setConsoleFn(config.consoleFn);
    } else if (!!console) {
      this.setConsoleFn(console);
    } else if (!!window.console) {
      this.setConsoleFn(window.console);
    } else {
      this.filters.addFilter(new Block());
    }
    return this;
  }


  public setConsoleFn(consoleFn: Console): this {
    if (!console.log ||
        !console.debug ||
        !console.info ||
        !console.warn ||
        !console.error) {
      return this;
    }
    this.consoleFn = consoleFn;
    return this;
  }


  public log(message: Message): this {
    if (!this.filters.passesFilters(message)) {
      return this;
    }

    const level = (message.level === Level.Undecided) ? Level.Log : message.level;

    if (!!this.name && !!this.consoleFn.group) {
      this.consoleFn.group( this.name );
    }

    const fn = Level[level].toLowerCase();
    this.consoleFn[fn](message.message);

    if (!!this.name && !!this.consoleFn.group) {
      this.consoleFn.groupEnd();
    }

    return this;
  }
}
