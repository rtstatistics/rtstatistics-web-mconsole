import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {User} from '../models/user';
import {ApiResponse} from "../models/api-response";
import {BaseApiService} from './base-api.service';
import {SettingsService} from "./settings.service";

@Injectable()
export class UserService extends BaseApiService{

    constructor(http: ApiHttp, settings: SettingsService){
        super(http, settings);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl;
    }

    getAll() : Observable<ApiResponse<User[]>> {
        return super.get('/users');
    }

    get(id: string): Observable<ApiResponse<User>>{
        return super.get('/users/' + id);
    }
}