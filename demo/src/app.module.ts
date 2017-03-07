import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Log4ngModule } from '@ngx-log4ng/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Log4ngModule.forRoot({
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
      ]
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
