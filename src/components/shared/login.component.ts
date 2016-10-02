import { DomSanitizationService } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { CoreServices } from '../../services/core-services.service';
import { Component, OnDestroy } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';



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
export class LoginComponent implements OnDestroy {
    message: string = '';
    visible: boolean = false;

    result: Promise<boolean>;
    resultResolve: any;
    resultReject: any;

    autoSaveApiKey: boolean = false;

    embeddedLoginEventListener: any = this.onEmbeddedLoginEvent.bind(this);

    private authService: AuthService;

    constructor(private coreServices: CoreServices, private sanitizer: DomSanitizationService) {
        this.authService = coreServices.auth;
        this.authService.login = this.activate.bind(this);
    }

    get embeddedLoginUrl(){
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            this.coreServices.settings.manageApiBaseUrl + '/auth/login?embedded');
    }

    private registerEventListener(): void {
        window.addEventListener('message', this.embeddedLoginEventListener, false);
    }

    private unregisterEventListener(): void {
        window.removeEventListener('message', this.embeddedLoginEventListener, false);
    }

    ngOnDestroy() {
        this.unregisterEventListener();
    }

    activate(message: string) : Promise<boolean> {
        if (!this.visible) {  // check to see if the dialog is already visible
            this.message = message;
            this.registerEventListener();
            this.visible = true;

            this.result = new Promise<boolean>((resolve, reject) => {
                this.resultResolve = resolve;
                this.resultReject = reject;
            });
        }
        return this.result;
    }

    onCancel() {
        this.visible = false;
        this.unregisterEventListener();
        this.resultResolve(false);
    }

    onApiKeySet(key: string, save: boolean) {
        this.authService.setOrganizationApiKey(key, save);
        this.autoSaveApiKey = save;
        this.visible = false;
        this.unregisterEventListener();
        this.resultResolve(true);
    }

    onEmbeddedLoginEvent(event: any): void {
        let msg: string = event.data;
        if (msg === 'EmbeddedLogin:succeeded') {
            this.authService.setOrganizationApiKey(null);
            this.visible = false;
            this.unregisterEventListener();
            this.resultResolve(true);
       }
    }

}