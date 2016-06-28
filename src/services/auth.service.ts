import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, RequestOptionsArgs} from '@angular/http';

import {SettingsService} from "../services/settings.service";

import {User} from '../models/user';
import {Organization} from '../models/organization';

@Injectable()
export class AuthService {
    private _orgApiKey: string;
    login: (message?: string) => Promise<boolean>;

    private _currentUser: User;
    get currentUser(){
        return this._currentUser;
    }
    private _currentOrganization: Organization;
    get currentOrganization(){
        return this._currentOrganization;
    }

    private _shouldRefreshUserAndOrganization: boolean = false;


    constructor(protected http: Http, protected settings: SettingsService){
        this.unauthenticated();
        settings.organizationApiKeyValues.subscribe(
            key=>{
                this._orgApiKey=key;
                this.authenticationMayChange();
            }
        );
    }

    get isAuthenticated(){
        return this._currentUser != null && this._currentUser.id != 'Unknown';
    }

    authenticationMayChange(){
        this._shouldRefreshUserAndOrganization = true;
    }

    unauthenticated(){
        this._currentUser = new User('Unknown', 'Unknown', 'Unknown');
        this._currentOrganization = new Organization('Unknown', 'Unknown');
    }

    authenticated(){
        if (!this.isAuthenticated || this._shouldRefreshUserAndOrganization){
            // reload user and organization
            let baseUrl:string = this.settings.manageApiBaseUrl;
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            this.appendHeaders(headers);
            let options = {
                headers: headers
            };
            this.http.get(baseUrl + '/users/me', options).subscribe(
                data => {
                    let user = data.json().result;
                    this._currentUser = Object.assign(new User(), user);
                    if (user.organization){
                        this._currentOrganization = Object.assign(new Organization(), user.organization);
                    }
                    this._shouldRefreshUserAndOrganization = false;
                },
                err => {
                    if (err.status === 404){    // if authenticated by api key
                        this._currentUser = new User(null, null, '*API Client*');
                        this.http.get(baseUrl + '/organizations/mine', options).subscribe(
                            data => {
                                let org = data.json().result;
                                this._currentOrganization = Object.assign(new Organization(), org);
                                this._shouldRefreshUserAndOrganization = false;
                            },
                            err => {
                                // do nothing
                            }
                        );
                    }
                }
            );
        }
    }

    setOrganizationApiKey(key: string, save?: boolean){
        this._orgApiKey = key;
        if (save){
            this.settings.organizationApiKey = key;
            // and the same key will be propogated back through subscripting to the observable
        }
        this.authenticationMayChange();
    }

    private getOrgApiKey(){
        if (this._orgApiKey == null){
            this._orgApiKey = this.settings.organizationApiKey
        }
        return this._orgApiKey;
    }

    get isOrgApiKeySet(): boolean{
        return this.getOrgApiKey() != null;
    }

    /**
     * Append authentication related headers.
     */
    appendHeaders(headers: Headers){
        if (this.isOrgApiKeySet){
            headers.append('Authorization', 'Basic ' + btoa(this.getOrgApiKey()));
        }
    }


}