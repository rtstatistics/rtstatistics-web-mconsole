import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ApiHttp } from './api-http.service';

import { SettingsService } from '../services/settings.service';
import { AuthService } from './auth.service';

@Injectable()
export abstract class AbstractApiService {

    constructor(protected http: ApiHttp, protected settings: SettingsService, protected authService: AuthService) {
    }

    protected abstract getBaseUrl(settings: SettingsService): string;

    get baseUrl(){
        return this.getBaseUrl(this.settings);
    }

    /**
     * Get the body returned in the response 
     * 
     * @private
     * @param {Response} response   http response
     * @returns {*}     null if no body, otherwise the body as an object
     */
    private getBody(response: Response): any {
        this.authService.authenticated(); // a successful API response received
        if (response.status === 204) {
            return null;
        }else {
            try {
                return response.json();
            }catch (e) {
                let text = response.text();
                if (text == null || text === '') {
                    return null;
                }else {
                    return text;
                }
            }
        }
    }

    protected rawGet(url: string): Observable<any> {
        return this.http.get(this.baseUrl + url)
            .map(response => this.getBody(response));
    }

    protected rawPost(url: string, data: any): Observable<any> {
        return this.http.post(this.baseUrl + url, JSON.stringify(data))
            .map(response => this.getBody(response));
    }

    protected rawPut(url: string, data?: any): Observable<any> {
        return this.http.put(this.baseUrl + url, data == null ? null : JSON.stringify(data))
            .map(response => this.getBody(response));
    }

    protected rawPatch(url: string, data?: any): Observable<any> {
        return this.http.patch(this.baseUrl + url, data == null ? null : JSON.stringify(data))
            .map(response => this.getBody(response));
    }

    protected rawDelete(url: string): Observable<any> {
        return this.http.delete(this.baseUrl + url)
            .map(response => this.getBody(response));
    }

}