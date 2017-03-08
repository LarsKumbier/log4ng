import { Component, OnInit } from '@angular/core';
import { Log4ngService, Level } from '@ngx-log4ng/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  protected logger: Log4ngService;

  constructor(logger: Log4ngService) {
    this.logger = logger;
  }

  ngOnInit(): void {
    this.logger.log(`Automatic LOG Message`, Level.Log);
    this.logger.log(`Automatic DEBUG Message`, Level.Debug);
    this.logger.log(`Automatic INFO Message`, Level.Info);
    this.logger.log(`Automatic WARN Message`, Level.Warn);
    this.logger.log(`Automatic ERROR Message`, Level.Error);

    let timeout = setTimeout(() => {
      this.fail('Automatic Error Thrown');
    }, 250);
  }

  log(message: string): void {
    this.logger.log(message, Level.Log);
  }

  debug(message: string): void {
    this.logger.log(message, Level.Debug);
  }

  info(message: string): void {
    this.logger.log(message, Level.Info);
  }

  warn(message: string): void {
    this.logger.log(message, Level.Warn);
  }

  error(message: string): void {
    this.logger.log(message, Level.Error);
  }

  fail(message?: string): void {
    message = (!!!message) ? 'I am a thrown error' : message;
    throw new Error(message);
  }

  title = 'Log4ng Demo';
}
