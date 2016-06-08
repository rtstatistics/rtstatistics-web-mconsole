/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserDetailComponent } from './components/user-detail.component';
import { HomeComponent } from './components/home.component';

if (typeof process !== 'undefined' // process will be undefined if running from lite server
    && process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(HomeComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);