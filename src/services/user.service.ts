import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {User} from '../models/user';
import {ApiResponse} from "../models/api-response";
import {BaseApiService} from './base-api.service';
import {SettingsService} from "./settings.service";
import {AbstractAssetService} from './abstract-asset.service';

@Injectable()
export class UserService extends AbstractAssetService<User>{

    constructor(http: ApiHttp, settings: SettingsService){
        super(http, settings);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/users';
    }

    convert(obj: any): User{
        return Object.assign(new User(), obj);
    }

}