import {
  MockApplicationRef,
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import {MockLocationStrategy, SpyLocation} from '@angular/common/testing';
import {Component, ComponentResolver, provide} from '@angular/core';import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTER_PROVIDERS} from '@angular/router';
import {CanDeactivate, DefaultRouterUrlSerializer, OnActivate, ROUTER_DIRECTIVES, Route, RouteSegment, Router, RouterOutletMap, RouterUrlSerializer, Routes} from '@angular/router';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEachProviders(() => [
    /*
    ROUTER_PROVIDERS,
    {provide: Location, useClass: SpyLocation},
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(ApplicationRef, {useClass: MockApplicationRef}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    */
    {provide: RouterUrlSerializer, useClass: DefaultRouterUrlSerializer}, 
    RouterOutletMap,
    {provide: Location, useClass: SpyLocation},
    {provide: LocationStrategy, useClass: MockLocationStrategy}, 
    {provide: Router,
               useFactory:
                   (resolver: any /** TODO #9100 */, urlParser: any /** TODO #9100 */,
                    outletMap: any /** TODO #9100 */, location: any /** TODO #9100 */) =>
                       new Router(
                           'AppComponent', AppComponent, resolver, urlParser, outletMap, location),
               deps: [ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location]
    },
    AppComponent
  ]);
  it ('should DI work', inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeDefined();
  }));

});