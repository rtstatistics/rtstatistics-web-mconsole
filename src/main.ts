/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { MdIconRegistry } from '@angular2-material/icon';
import { MdRadioDispatcher } from '@angular2-material/radio';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { NotificationService } from './services/notification.service';
import { AppComponent } from './components/app.component';

require('./styles.css');

// lite-server doesn't need images to be required; webpack knows to load images from configuration file.

if (typeof process !== 'undefined' // process will be undefined if running from lite server
    && process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  MdIconRegistry,
  MdRadioDispatcher,
  ToasterService,
  NotificationService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);