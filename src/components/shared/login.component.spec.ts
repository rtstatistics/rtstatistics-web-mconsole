import {
  MockApplicationRef,
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {CoreServices} from '../../services/core-services.service';
import {Headers, Http, HTTP_PROVIDERS} from '@angular/http';

const EVENT_WAIT_MILLIS = 100;
const SAMPLE_API_KEY = 'abcde XYZ 123';
const SAMPLE_API_KEY2 = '1278683274687324';
const SAMPLE_API_KEY3 = 'iwqkj asdhjfp2ui3ij';
const SAMPLE_AUTHORIZATION = 'Basic ' + btoa(SAMPLE_API_KEY);
const SAMPLE_AUTHORIZATION3 = 'Basic ' + btoa(SAMPLE_API_KEY3);

describe('LoginComponent', () => {
  beforeEachProviders(() => [
    LoginComponent, AuthService, SettingsService, CoreServices, HTTP_PROVIDERS
  ]);
  it ('should DI work', 
    inject([LoginComponent, CoreServices], 
        (login: LoginComponent, coreServices: CoreServices) => {
            expect(login).toBeDefined();
            expect(coreServices).toBeDefined();
            expect(coreServices.auth).toBeDefined();
            expect(coreServices.settings).toBeDefined();
  }));
  it ('should set and save api key work when it was empty', 
    inject([LoginComponent, CoreServices, AuthService, SettingsService, Http], 
        (login: LoginComponent, coreServices: CoreServices, auth: AuthService, settings: SettingsService) => {
            settings.organizationApiKey = null;
            setTimeout(()=>{
                expect(!auth.isOrgApiKeySet).toBeTruthy();

                let headers = new Headers();
                auth.appendHeaders(headers);
                expect(headers.get('Authorization')).toBeNull();

                login.activate('');
                // update both
                login.onApiKeySet(SAMPLE_API_KEY, true);
                headers = new Headers();
                auth.appendHeaders(headers);

                expect(headers.get('Authorization')).toBe(SAMPLE_AUTHORIZATION);
                expect(settings.organizationApiKey).toBe(SAMPLE_API_KEY);
            }, EVENT_WAIT_MILLIS);
  }));
  it ('should set and save api key work when it was not empty', 
    inject([LoginComponent, CoreServices, AuthService, SettingsService, Http], 
        (login: LoginComponent, coreServices: CoreServices, auth: AuthService, settings: SettingsService) => {
            settings.organizationApiKey = 'xyz';
            setTimeout(()=>{
                expect(auth.isOrgApiKeySet).toBeTruthy();
                let headers = new Headers();
                auth.appendHeaders(headers);
                expect(headers.get('Authorization')).not.toBeNull();

                login.activate('');
                // update both
                login.onApiKeySet(SAMPLE_API_KEY, true);
                headers = new Headers();
                auth.appendHeaders(headers);

                expect(headers.get('Authorization')).toBe(SAMPLE_AUTHORIZATION);
                expect(settings.organizationApiKey).toBe(SAMPLE_API_KEY);
            }, EVENT_WAIT_MILLIS);
  }));
  it ('should set but not save api key work when it was empty', 
    inject([LoginComponent, CoreServices, AuthService, SettingsService, Http], 
        (login: LoginComponent, coreServices: CoreServices, auth: AuthService, settings: SettingsService) => {
            settings.organizationApiKey = null;
            setTimeout(()=>{
                expect(!auth.isOrgApiKeySet).toBeTruthy();

                let headers = new Headers();
                auth.appendHeaders(headers);
                expect(headers.get('Authorization')).toBeNull();

                login.activate('');
                // update only in memory
                login.onApiKeySet(SAMPLE_API_KEY, false);
                headers = new Headers();
                auth.appendHeaders(headers);

                expect(headers.get('Authorization')).toBe(SAMPLE_AUTHORIZATION);
                expect(settings.organizationApiKey).toBeNull();
            }, EVENT_WAIT_MILLIS);
  }));
  it ('should set but not save api key work when it was not empty', 
    inject([LoginComponent, CoreServices, AuthService, SettingsService, Http], 
        (login: LoginComponent, coreServices: CoreServices, auth: AuthService, settings: SettingsService) => {
            settings.organizationApiKey = SAMPLE_API_KEY2;
            setTimeout(()=>{
                expect(auth.isOrgApiKeySet).toBeTruthy();
                let headers = new Headers();
                auth.appendHeaders(headers);
                expect(headers.get('Authorization')).not.toBeNull();

                login.activate('');
                // update only in memory
                login.onApiKeySet(SAMPLE_API_KEY, false);
                headers = new Headers();
                auth.appendHeaders(headers);

                expect(headers.get('Authorization')).toBe(SAMPLE_AUTHORIZATION);
                expect(settings.organizationApiKey).toBe(SAMPLE_API_KEY2);

                // update both
                login.onApiKeySet(SAMPLE_API_KEY3, true);
                headers = new Headers();
                auth.appendHeaders(headers);

                expect(headers.get('Authorization')).toBe(SAMPLE_AUTHORIZATION3);
                expect(settings.organizationApiKey).toBe(SAMPLE_API_KEY3);

            }, EVENT_WAIT_MILLIS);
  }));

});
