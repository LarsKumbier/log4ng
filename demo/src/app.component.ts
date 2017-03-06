import { Component } from '@angular/core';
import { Log4ngService } from '../../src/log4ng.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Click to fail!';

  constructor(public logging: Log4ngService) {}

  public throwAnError() {
    throw new Error('They\'ve changed the Matrix.');
  }
}
