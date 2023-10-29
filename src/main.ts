import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LOCALE_ID } from '@angular/core';


platformBrowserDynamic().bootstrapModule(AppModule,{
  providers: [{provide: LOCALE_ID, useValue: 'vi-VN' }]
})
  .catch(err => console.error(err));
