import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {PeriodsHierarchy} from '../models/periods-hierarchy';
import {ApiResponse} from "../models/api-response";
import {BaseApiService} from './base-api.service';

@Injectable()
export class PeriodsService extends BaseApiService{

    constructor(http: ApiHttp){
        super(http);
    }

    getAll() : Observable<ApiResponse<PeriodsHierarchy[]>> {
        return super.get('/periods');
    }

    get(id: string): Observable<ApiResponse<PeriodsHierarchy>>{
        return super.get('/periods/' + id);
    }
}