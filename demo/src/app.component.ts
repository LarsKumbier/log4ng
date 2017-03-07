import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Click to fail!';

  //constructor(public logging: Log4ngService) {}

  public throwAnError() {
    throw new Error('They\'ve changed the Matrix.');
  }
}
