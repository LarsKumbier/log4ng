import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { Log4ngModule, Log4ngService } from '@ngx-log4ng/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Log4ngModule.forRoot(
      {
        unwrapError: true,
        recipients: [
          {
            classname: 'ConsoleRecipient'
          }
        ]
      }
    )
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: Log4ngService
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
