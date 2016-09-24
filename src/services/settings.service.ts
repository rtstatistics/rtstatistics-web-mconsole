import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
    private static DEMO_ACCOUNT_API_KEY = 'DemoKey';
    private static PREFIX: string = 'rts-mconsole-';
    private MANAGE_API_BASE_URL = SettingsService.PREFIX + 'manage-api-base-url';
    private DATA_API_BASE_URL = SettingsService.PREFIX + 'data-api-base-url';
    private ORG_API_KEY: string = SettingsService.PREFIX + 'org-api-key';

    manageApiBaseUrlValues: EventEmitter<string> = new EventEmitter<string>();
    dataApiBaseUrlValues: EventEmitter<string> = new EventEmitter<string>();
    organizationApiKeyValues: EventEmitter<string> = new EventEmitter<string>();

    get manageApiBaseUrl(){
        return localStorage.getItem(this.MANAGE_API_BASE_URL)
            || 'https://manage.rtstatistics.com';
    }

    set manageApiBaseUrl(url: string){
        this.setInLocalStorage(this.MANAGE_API_BASE_URL, url);
        this.manageApiBaseUrlValues.emit(url);
    }

    get dataApiBaseUrl(){
        return localStorage.getItem(this.DATA_API_BASE_URL)
            || 'https://api.rtstatistics.com';
    }

    set dataApiBaseUrl(url: string){
        this.setInLocalStorage(this.DATA_API_BASE_URL, url);
        this.dataApiBaseUrlValues.emit(url);
    }

    get organizationApiKey(): string{
        let key = localStorage.getItem(this.ORG_API_KEY);
        /*
        if (key == null){ // first time, nothing set
            key = SettingsService.DEMO_ACCOUNT_API_KEY;
            this.setInLocalStorage(this.ORG_API_KEY, key);
        }
        */
        return key;
    }

    set organizationApiKey(apiKey: string){
        this.setInLocalStorage(this.ORG_API_KEY, apiKey);
        this.organizationApiKeyValues.emit(apiKey);
    }

    removeOrganizationApiKey() {
        localStorage.removeItem(this.ORG_API_KEY);
    }

    private setInLocalStorage(key: string, value: string) {
        if (value === null) {
            localStorage.removeItem(key);
        }else {
            localStorage.setItem(key, value);
        }
    }
}