import { Injectable } from '@angular/core';

declare var toastr: any;

@Injectable()
export class NotificationService {

    constructor() {}

    showSuccess(title: string, message?: string) {
        toastr.success(message, title, {timeOut: 10000});
    }

    showError(title: string, message?: string) {
        toastr.error(message, title, {timeOut: 10000});
    }

    showWarning(title: string, message?: string) {
        toastr.warning(message, title, {timeOut: 10000});
    }

    showInfo(message: string) {
        toastr.info(message, {timeOut: 15000});
    }
}
