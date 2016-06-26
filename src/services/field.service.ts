import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Field} from '../models/field';
import {ApiResponse} from '../models/api-response';
import {AbstractApiService} from './abstract-api.service';
import {SettingsService} from './settings.service';
import {AbstractAssetService} from './abstract-asset.service';
import {AuthService} from "./auth.service";

@Injectable()
export class FieldService extends AbstractAssetService<Field>{

    constructor(http: ApiHttp, settings: SettingsService, authService: AuthService){
        super(http, settings, authService);
    }

    protected getBaseUrl(settings: SettingsService): string{
        return settings.manageApiBaseUrl + '/datasets';
    }

    protected getPathSegment():string{
        return '/fields';
    }

    convert(obj: any): Field{
        return Object.assign(new Field(), obj);
    }

}