import { Observable } from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {ApiHttp} from "./api-http.service";
import {ApiResponse} from "../models/api-response";

import {SettingsService} from "../services/settings.service";

@Injectable()
export abstract class BaseApiService{

    constructor(protected http: ApiHttp, protected settings: SettingsService){
    }

    protected abstract getBaseUrl(settings: SettingsService): string;

    get baseUrl(){
        return this.getBaseUrl(this.settings);
    }

    protected get(url: string) : Observable<ApiResponse<any>>{
        return this.http.get(this.baseUrl + url)
            .map(response => response.json());
    }

}