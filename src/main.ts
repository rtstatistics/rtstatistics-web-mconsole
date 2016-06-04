/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
if (typeof process !== 'undefined' // process will be undefined if running from lite server
    && process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent, []);