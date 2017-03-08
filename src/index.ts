import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log4ngService } from './log4ng.service';
import { Log4ngServiceConfig } from './log4ng.service.config';

export { Log4ngService } from './log4ng.service';
export { Message, Level } from './message';

@NgModule({
  imports: [ CommonModule ],
  providers: [
    Log4ngService
  ]
})
export class Log4ngModule {
  static forRoot(config?: Log4ngServiceConfig): ModuleWithProviders {
    return {
      ngModule: Log4ngModule,
      providers: [
        {
          provide: Log4ngServiceConfig,
          useValue: config
        }
      ]
    };
  }


  static forChild(config?: Log4ngServiceConfig): ModuleWithProviders {
    return {
      ngModule: Log4ngModule,
      providers: [
        {
          provide: Log4ngServiceConfig,
          useValue: config
        }
      ]
    };
  }
}
