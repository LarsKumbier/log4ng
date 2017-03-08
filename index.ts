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

 import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
 import { CommonModule } from '@angular/common';

 import { Log4ngService } from './src/log4ng.service';
 import { Log4ngServiceConfig } from './src/log4ng.service.config';

 export { Log4ngService } from './src/log4ng.service';
 export { Message, Level } from './src/message';

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
