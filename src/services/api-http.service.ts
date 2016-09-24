import { Observable } from 'rxjs/Rx';
import 'rxjs/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, RequestOptions, Request, Response, RequestOptionsArgs } from '@angular/http';
import { AuthService } from './auth.service';

/**
 * Http service that automatically handles ask-for-authentication-then-retry for REST API calls.
 */
@Injectable()
export class ApiHttp {
    constructor(private http: Http, private authService: AuthService) {
    }

    /**
     * Append request headers for REST API calls.
     */
    private appendCommonHeaders(withJsonContentType: boolean, options?: RequestOptionsArgs): RequestOptionsArgs {
        let headers;
        if (options == null) {
            headers = new Headers();
            options = {headers: headers};
        }else if (options.headers == null) {
            headers = new Headers();
            options.headers = headers;
        }else {
            headers = options.headers;
        }

        headers.append('Accept', 'application/json');
        if (withJsonContentType) {
            headers.append('Content-Type', 'application/json');
        }
        this.authService.appendHeaders(headers);
        return options;
    }

    /**
     * This function handles automatic retry when 401 error happens.
     * The returned Observable throws errors with user friendly messages.
     */
    private withRetry(initialResult: Observable<Response>, func: (...params: any[]) => Observable<Response>, ...params: any[]): Observable<Response> {
        return initialResult
            .catch(error => {
                if (error.status === 401) {
                    this.authService.unauthenticated();     // 401 means authentication required
                    let message = this.authService.isOrgApiKeySet ? 'Incorrect organization API key' : 'Authentication is required';
                    return Observable.fromPromise(this.authService.login(message))
                        .mergeMap(confirmed => {
                            if (confirmed) { // logged in again, or updated api key
                                this.authService.authenticationMayChange();
                                switch (params.length) {
                                    case 1:
                                        return func(params[0]);
                                    case 2:
                                        return func(params[0], params[1]);
                                    case 3:
                                        return func(params[0], params[1], params[2]);
                                    default:
                                        return Observable.throw(new Error('Wrong number of parameters: ' + params));
                                }
                            }else {      // canceled
                                return Observable.throw(new Error('User cancelled authentication'));
                            }
                        });
                }else {
                    let errorDetail = error.json();
                    if (errorDetail) {
                        this.authService.authenticated();  // a valid API response received
                        return Observable.throw(new Error(errorDetail.type + ': ' + errorDetail.message));
                    }
                    console.log('API call failed: ' + JSON.stringify(error));
                    return Observable.throw(error);
                }
            });
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.withRetry(this.http.get(url, this.appendCommonHeaders(false, options)),
            this.get.bind(this), url, options);
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.withRetry(this.http.post(url, body, this.appendCommonHeaders(true, options)),
            this.post.bind(this), url, body, options);
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.withRetry(this.http.put(url, body, this.appendCommonHeaders(true, options)),
            this.put.bind(this), url, body, options);
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.withRetry(this.http.patch(url, body, this.appendCommonHeaders(true, options)),
            this.patch.bind(this), url, body, options);
    }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.withRetry(this.http.delete(url, this.appendCommonHeaders(false, options)),
            this.delete.bind(this), url, options);
    }


}
