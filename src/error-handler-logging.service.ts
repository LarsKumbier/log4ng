/*
 * @see https://esdiscuss.org/topic/es6-iteration-over-object-values
 */

import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Log4ngService } from '.';


export interface ILoggingErrorHandlerConfig {
  rethrowError: boolean;
  unwrapError: boolean;
}

export const LOG4NG_ERROR_HANDLER_CONFIG: ILoggingErrorHandlerConfig = {
  rethrowError: false,
  unwrapError: false
};


@Injectable()
export class ErrorHandlerLoggingService implements ErrorHandler {

  constructor(
    private loggingService: Log4ngService,
    @Inject ( LOG4NG_ERROR_HANDLER_CONFIG ) private options: ILoggingErrorHandlerConfig
  ) { }

  public handleError(error: Error): void {
    error = this.options.unwrapError ? this.findOriginalError(error) : error;
    this.loggingService.logError(error);

    if (this.options.rethrowError) {
      throw error;
    }
  }

  private findOriginalError( error: any ): any {
    while ( error && error.originalError ) {
      error = error.originalError;
    }
    return( error );
  }
}

export const LOG4NG_ERROR_HANDLER_PROVIDERS = [
  {
    provide: LOG4NG_ERROR_HANDLER_CONFIG,
    useValue: LOG4NG_ERROR_HANDLER_CONFIG
  },
  {
    provide: ErrorHandler,
    useClass: ErrorHandlerLoggingService
  }
];
