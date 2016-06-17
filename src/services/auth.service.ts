import {Injectable} from "@angular/core";
import {Headers} from '@angular/http';

import {SettingsService} from "../services/settings.service";

@Injectable()
export class AuthService {
    private _orgApiKey: string;
    login: (message?: string) => Promise<boolean>;

    constructor(protected settings: SettingsService){
        settings.organizationApiKeyValues.subscribe(
            (key=>this._orgApiKey=key).bind(this)
        );
    }

    setOrganizationApiKey(key: string, save?: boolean){
        this._orgApiKey = key;
        if (save){
            this.settings.organizationApiKey = key;
            // and the same key will be propogated back through subscripting to the observable
        }
    }

    private getOrgApiKey(){
        if (this._orgApiKey === null){
            this._orgApiKey = this.settings.organizationApiKey
        }
        return this._orgApiKey;
    }

    get isOrgApiKeySet(): boolean{
        return this.getOrgApiKey() !== null;
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