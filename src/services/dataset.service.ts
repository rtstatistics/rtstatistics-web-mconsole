import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ApiHttp} from './api-http.service';
import {Response} from '@angular/http';
import {Dataset} from '../models/dataset';
import {ApiResponse} from "../models/api-response";
import {BaseApiService} from './base-api.service';

@Injectable()
export class DatasetService extends BaseApiService{

    constructor(http: ApiHttp){
        super(http);
    }

    getAll() : Observable<ApiResponse<Dataset[]>> {
        return super.get('/datasets');
    }

    get(id: string): Observable<ApiResponse<Dataset>>{
        return super.get('/datasets/' + id);
    }
}