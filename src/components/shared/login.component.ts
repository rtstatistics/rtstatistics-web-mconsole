import {Component} from '@angular/core';

import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';

import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';

@Component({
    moduleId: module.id,
    selector: 'login-dialog',
    template: require('./login.component.html'),
    styles: [require('./login.component.css')],
    directives: [
        MD_BUTTON_DIRECTIVES, 
        MD_CARD_DIRECTIVES, 
        MD_TABS_DIRECTIVES, 
        MD_INPUT_DIRECTIVES, 
        MD_CHECKBOX_DIRECTIVES
    ]
})
export class LoginComponent {
    message: string = '';
    visible: boolean = false;

    result: Promise<boolean>;
    resultResolve: any;
    resultReject: any;

    autoSaveApiKey: boolean = false;

    constructor(private authService: AuthService, public settings: SettingsService) {
        authService.login = this.activate.bind(this);
    }

    activate(message: string) : Promise<boolean> {
        if (!this.visible){  // check to see if the dialog is already visible
            this.message = message;
            this.visible = true;

            this.result = new Promise<boolean>((resolve, reject)=> {
                this.resultResolve = resolve;
                this.resultReject = reject;
            });
        }
        return this.result;
    }


    onCancel(){
        this.visible = false;
        this.resultResolve(false);
    }

    onApiKeySet(key: string, save: boolean){
        this.authService.orgApiKey = key;
        this.visible = false;
        this.resultResolve(true);
        this.settings.organizationApiKey = save ? key : null;
        this.autoSaveApiKey = save;
    }

}