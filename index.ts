/**
    Copyright 2017 Lars Kumbier

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILog4ngServiceConfig } from './src/i-logging-service-config';
import {
  Log4ngService,
  LOG4NG_SERVICE_CONFIG,
  LOG4NG_SERVICE_HANDLER_PROVIDERS,
  ErrorHandlerLoggingService,
  LOG4NG_ERROR_HANDLER_CONFIG,
  LOG4NG_ERROR_HANDLER_PROVIDERS
} from './src';

export * from './src';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Log4ngService,
    ErrorHandlerLoggingService
  ],
  exports: [
    Log4ngService,
    ErrorHandlerLoggingService
  ]
})
export class Log4ngModule {
    static forRoot(config: ILog4ngServiceConfig = LOG4NG_SERVICE_CONFIG): ModuleWithProviders {
        return {
            ngModule: Log4ngModule,
            providers: LOG4NG_SERVICE_HANDLER_PROVIDERS
        };
    }

    static forChild(config: ILog4ngServiceConfig = LOG4NG_SERVICE_CONFIG): ModuleWithProviders {
        return {
            ngModule: Log4ngModule,
            providers: LOG4NG_SERVICE_HANDLER_PROVIDERS
        };
    }
}
