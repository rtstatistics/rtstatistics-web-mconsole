import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import {Injectable} from "@angular/core";
import {Http, Headers, ConnectionBackend, RequestOptions, Request, Response, RequestOptionsArgs} from '@angular/http';
import {AuthService} from "./auth.service";

/**
 * Http service that handles authentication for REST API calls.
 */
@Injectable()
export class ApiHttp {
    constructor(private http: Http, private authService: AuthService) {
    }

    /**
     * Append request headers for REST API calls.
     */
    private appendCommonHeaders(options?: RequestOptionsArgs): RequestOptionsArgs{
        let headers;
        if (typeof options === 'undefined'){
            headers = new Headers();
            options = {headers: headers};
        }else if (typeof options.headers == 'undefined'){
            headers = new Headers();
            options.headers = headers;
        }
        
        headers.append('Accept', 'application/json');
        this.authService.appendHeaders(headers);
        return options;
    }

    private withRetry(initialResult: Observable<Response>, func: (...params: any[]) => Observable<Response>, ...params: any[]) : Observable<Response>{
        return initialResult
            .catch(error => {
                if (error.status === 401){
                    let message = this.authService.isOrgApiKeySet ? 'Incorrect organization API key' : 'Authentication is required';
                    return Observable.fromPromise(this.authService.login(message))
                        .mergeMap(confirmed => {
                            if (confirmed){ // logged in again, or updated api key
                                switch(params.length){
                                    case 1:
                                        return func(params[0]);
                                    case 2:
                                        return func(params[0], params[1]);
                                    case 3:
                                        return func(params[0], params[1], params[2]);
                                    default:
                                        throw new Error('Wrong number of parameters: ' + params);
                                }
                            }else{      // canceled
                                throw new Error('User cancelled authentication');
                            }
                        });
                }else if (error.status === 403){
                    throw new Error(error.json().error.message);
                }else{
                    console.log('API call failed: ' + JSON.stringify(error));
                    throw error;
                }
            });
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response>{
        return this.withRetry(this.http.get(url, this.appendCommonHeaders(options)),
            this.get.bind(this), url, options);
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>{
        return this.withRetry(this.http.post(url, body, this.appendCommonHeaders(options)),
            this.post.bind(this), url, body, options);
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>{
        return this.withRetry(this.http.put(url, body, this.appendCommonHeaders(options)),
            this.put.bind(this), url, body, options);
    }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
        return this.withRetry(this.delete(url, this.appendCommonHeaders(options)),
            this.delete.bind(this), url, options);
    }


}
