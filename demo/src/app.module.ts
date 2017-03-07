import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LOG4NG_SERVICE_HANDLER_PROVIDERS, LOG4NG_ERROR_HANDLER_PROVIDERS, LOG4NG_SERVICE_CONFIG, LOG4NG_ERROR_HANDLER_CONFIG, Level } from '@ngx-log4ng/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
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
          }
        ],
        filters: []
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
  imports: [
    BrowserModule,
    HttpModule,
    //Log4ngModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
