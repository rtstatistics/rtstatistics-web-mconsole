import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class NotificationService {
    constructor(private toaster: ToasterService) {

    }

    private showToast(type: string, title: string, body: string) {
        this.toaster.pop({
            type: type,
            title: title,
            body: body
        });
    }

    showErrorToast(message: string) {
        this.showToast('error', undefined, message);
    }

    showWarningToast(message: string) {
        this.showToast('warning', undefined, message);
    }

    showSuccessToast(message: string) {
        this.showToast('success', undefined, message);
    }

    showInfoToast(message: string) {
        this.showToast('info', undefined, message);
    }


}