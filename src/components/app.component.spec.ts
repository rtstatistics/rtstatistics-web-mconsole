import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';
import {Component, ComponentResolver, Injector, provide} from '@angular/core';
import { APP_BASE_HREF, Location } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import {ROUTER_DIRECTIVES, Route, ActivatedRoute, Router, RouterOutletMap, UrlSerializer, DefaultUrlSerializer} from '@angular/router';

import { AppComponent } from './app.component';
import {routes} from './app.routes';

describe('App', () => {
  beforeEachProviders(() => [
    /*
    ROUTER_PROVIDERS,
    {provide: Location, useClass: SpyLocation},
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(ApplicationRef, {useClass: MockApplicationRef}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    */
    {provide: UrlSerializer, useClass: DefaultUrlSerializer}, 
    RouterOutletMap,
    {provide: Location, useClass: SpyLocation},
    {
      provide: Router,
      useFactory: (
            resolver: ComponentResolver,
            urlSerializer: UrlSerializer,
            outletMap: RouterOutletMap,
            location: Location,
            injector: Injector) => {
            const r = new Router(AppComponent, resolver, urlSerializer, outletMap, location, injector, routes);
//            r.initialNavigation();
            return r;
          },
          deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
    },
    {provide: ActivatedRoute, useFactory: (r:Router) => r.routerState.root, deps: [Router]},
    AppComponent
  ]);
  it ('should DI work', inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeDefined();
  }));

});