/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdIconRegistry } from '@angular2-material/icon';

import { AppComponent } from './components/app.component';

require('./styles.css')
require('./table.css');

if (typeof process !== 'undefined' // process will be undefined if running from lite server
    && process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  MdIconRegistry,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);