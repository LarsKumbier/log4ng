import { Recipient } from './recipient';
import { ReflectiveInjector, Inject } from '@angular/core';
import { GelfMessage } from './graylog/gelf-message';
import { RecipientConfigParams } from './recipient-config';
import { Message } from '../message';

// this ugly thing is from here: http://stackoverflow.com/a/39243599/898999
import {
  Http,
  RequestOptions,
  ResponseOptions,
  BrowserXhr,
  BaseRequestOptions,
  BaseResponseOptions,
  ConnectionBackend,
  XHRBackend,
  XSRFStrategy,
  CookieXSRFStrategy,
  Headers
} from '@angular/http';


export interface GraylogConfig extends RecipientConfigParams {
  gelfUrl: string;
  name?: string;
  failSilently?: boolean;
  headers?: Object;
  http?: Http;
}


export class Graylog implements Recipient {
  protected _gelfUrl: string;
  protected http: Http;
  protected headers: Object = {};
  protected name = 'Graylog';
  protected failSilently = false;

  constructor(config: GraylogConfig) {
    if (!!!config) {
      throw new Error('A configuration object is required - please refer to the interface "LogToGraylogConfig" for an example');
    }

    if (!!!config.gelfUrl) {
      this.gelfUrl = config.gelfUrl;
    }
    this.gelfUrl = config.gelfUrl;

    if (!!config.failSilently && typeof config.failSilently === 'boolean') {
      this.failSilently = config.failSilently;
    }

    if (config.headers && typeof config.headers === 'object') {
      this.headers = config.headers;
    }

    if (!!config.name) {
      this.name = config.name;
    }

    this.http = (config.http && config.http instanceof Http)
        ? config.http
        : this.getInjectedHttp();
  }

  get gelfUrl(): string {
    return this._gelfUrl;
  }

  set gelfUrl(newUrl: string) {
    if (typeof newUrl !== 'string') {
      throw new Error('Configuration requires an endpoint of a graylog GELF-HTTP plugin' +
        'under the config option "gelfUrl" - example: { gelfUrl: "http://1.2.3.4:12201/gelf" }');
    }
    this._gelfUrl = newUrl;
  }

  protected getInjectedHttp(): Http {
    const injector = ReflectiveInjector.resolveAndCreate([
      Http,
      BrowserXhr,
      {provide: RequestOptions, useClass: BaseRequestOptions},
      {provide: ResponseOptions, useClass: BaseResponseOptions},
      {provide: ConnectionBackend, useClass: XHRBackend},
      {provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy()}
    ]);

    return injector.get(Http);
  }


  public logError(error: Error): this {
    this.send(new GelfMessage(error.message, error.stack));
    return this;
  }


  public log(message: Message): this {
    this.send(new GelfMessage(message.message, null, message.level));

    return this;
  }


  protected send(message: GelfMessage): void {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    for (const key of Object.keys(this.headers)) {
      headers.set(key, this.headers[key]);
    }
    const options = new RequestOptions({ headers: headers });

    this.http.post(this.gelfUrl, JSON.stringify(message), options)
             .subscribe(
               (response) => {
                 if (!response.ok) {
                   this.handleError(response);
                 }
               },
               error => this.handleError(error)
             );
  }


  protected handleError(error: any): void {
    if (this.failSilently) {
      return;
    }

    if (console && console.group && console.error) {
      console.group(`LogWriters::${this.name}<Graylog>`);
      console.error('ERROR while sending logs');
      console.error(`Could not send data to graylog server ${this.gelfUrl}`);
      console.error(error);
      console.groupEnd();
    }
  }
}
