import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import {SpyLocation} from '@angular/common/testing';
import {Component, provide} from '@angular/core';
import {Headers, Http, HTTP_PROVIDERS} from '@angular/http';

import {CoreServices} from './core-services.service';
import {ApiHttp} from './api-http.service';
import {AuthService} from './auth.service';
import {NotificationService} from './notification.service';
import {SettingsService} from './settings.service';

describe('CoreServices', () => {
  beforeEachProviders(() => [
      HTTP_PROVIDERS,
      ApiHttp,
      AuthService,
      SettingsService,
      CoreServices
  ]);
  it ('should DI work', inject([CoreServices], (services: CoreServices) => {
      expect(services).not.toBeNull();
      
      expect(services.notification).toBeNull();

      expect(services.apiHttp).not.toBeNull();
      expect(services.auth).not.toBeNull();
      expect(services.settings).not.toBeNull();
  }));

});