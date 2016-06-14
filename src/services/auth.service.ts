import {Injectable} from "@angular/core";
import {Headers} from '@angular/http';

@Injectable()
export class AuthService {
    private _orgApiKey: string;
    login: (message?: string) => Promise<boolean>;

    set orgApiKey(key: string){
        this._orgApiKey = key;
    }

    get isOrgApiKeySet(): boolean{
        return this._orgApiKey != null;
    }

    /**
     * Append authentication related headers.
     */
    appendHeaders(headers: Headers){
        if (this.isOrgApiKeySet){
            headers.append('Authorization', "Basic " + btoa(this._orgApiKey));
        }
    }
}