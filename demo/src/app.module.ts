import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LOG4NG_SERVICE_HANDLER_PROVIDERS, LOG4NG_SERVICE_CONFIG } from '../../src/log4ng.service';
import { LOG4NG_ERROR_HANDLER_PROVIDERS, LOG4NG_ERROR_HANDLER_CONFIG } from '../../src/error-handler-logging.service';
import { Level } from '../../src/message/level';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LOG4NG_SERVICE_HANDLER_PROVIDERS,
    {
      provide: LOG4NG_SERVICE_CONFIG,
      useValue: {
        recipients: [
          {
            classname: 'ConsoleWriter',
            params: {
              name: 'Angular2 Test App::Console Logger'
            }
          }/*,
          {
            classname: 'Graylog',
            params: {
              gelfUrl: 'http://192.168.220.100:32222/gelf'
            }
          }*/
        ],
        filters: [
          {
            classname: 'HasMinLevel',
            params: {
              minLevel: Level.Info
            }
          }
        ]
      }
    },

    LOG4NG_ERROR_HANDLER_PROVIDERS,
    {
      provide: LOG4NG_ERROR_HANDLER_CONFIG,
      useValue: {
        rethrowError: false,
        unwrapError: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
