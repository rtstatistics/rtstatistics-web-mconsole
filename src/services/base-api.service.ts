import { Observable } from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {ApiHttp} from "./api-http.service";
import {ApiResponse} from "../models/api-response";

@Injectable()
export class BaseApiService{
    public static get BASE_URL(): string { return 'https://manage.rtstatistics.com'; }

    constructor(protected http: ApiHttp){
    }

    protected get(url: string) : Observable<ApiResponse<any>>{
        return this.http.get(BaseApiService.BASE_URL + url)
            .map(response => response.json());
    }

}