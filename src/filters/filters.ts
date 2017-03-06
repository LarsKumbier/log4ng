import * as filters from '.';
import { Message } from '../message';

export class LogFilters {
  protected filters: Array<filters.ILogFilter> = [];

  public addFiltersByConfig(config: any): this {
    if (!!!config) {
      return this;
    }

    if (!(config instanceof Array)) {
      throw new Error('filters need to be an array like [<ILogFilterConfig>,<ILogFilterConfig>]');
    }

    for (const entry of config) {
      this.addFilterByConfig(entry);
    }

    return this;
  }


  public addFilterByConfig(config: any): this {
    const filter = config.params
      ? new filters[config.classname](config.params)
      : new filters[config.classname]();
    this.addFilter(filter);
    return this;
  }


  public addFilter(filter: filters.ILogFilter): this {
    this.filters.push(filter);
    return this;
  }


  public passesFilters(message: Message): boolean {
    let msgShouldBeLogged = true;

    for (const filter of this.filters) {
      if (msgShouldBeLogged) {
        msgShouldBeLogged = filter.shouldBeLogged(message);
      }
    }

    return msgShouldBeLogged;
  }
}
