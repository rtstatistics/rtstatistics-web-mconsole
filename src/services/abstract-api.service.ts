import { Observable } from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {Response} from '@angular/http';
import {ApiHttp} from "./api-http.service";
import {ApiResponse} from "../models/api-response";

import {SettingsService} from "../services/settings.service";
import {AuthService} from "./auth.service";

@Injectable()
export abstract class AbstractApiService{

    constructor(protected http: ApiHttp, protected settings: SettingsService, protected authService: AuthService){
    }

    protected abstract getBaseUrl(settings: SettingsService): string;

    get baseUrl(){
        return this.getBaseUrl(this.settings);
    }

    private getBody(response: Response){
        this.authService.authenticated(); // a successful API response received
        if (response.status === 204){
            return null;
        }else{
            try{
                return response.json();
            }catch(e){
                let text = response.text();
                if (text == null || text == ''){
                    return null;
                }else{
                    return text;
                }
            }
        }
    }

    protected get(url: string) : Observable<ApiResponse<any>>{
        return this.http.get(this.baseUrl + url)
            .map(response => this.getBody(response));
    }

    protected post(url: string, data: any) : Observable<ApiResponse<any>>{
        return this.http.post(this.baseUrl + url, JSON.stringify(data))
            .map(response => this.getBody(response));
    }

    protected delete(url: string) : Observable<ApiResponse<any>>{
        return this.http.delete(this.baseUrl + url)
            .map(response => this.getBody(response));
    }
    
    protected update(url: string, data: any) : Observable<ApiResponse<any>>{
        return this.http.put(this.baseUrl + url, JSON.stringify(data))
            .map(response => this.getBody(response));
    }
    

}