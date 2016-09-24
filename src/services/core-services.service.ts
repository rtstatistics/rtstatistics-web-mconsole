import { Injectable, Optional } from '@angular/core';
import { Http } from '@angular/http';

import { ApiHttp } from './api-http.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { SettingsService } from './settings.service';

/**
 * This is the holder of for all core services.
 * By holding all core services in one place, duplicated service injection
 * code in component classes can be minimized.
 * 
 * @export
 * @class CoreServices
 */
@Injectable()
export class CoreServices {

    constructor(
        @Optional() public http?: Http,
        @Optional() public apiHttp?: ApiHttp,
        @Optional() public auth?: AuthService,
        @Optional() public notification?: NotificationService,
        @Optional() public settings?: SettingsService
    ) { }

}