import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../website/service/auth.service';

@Component({
    selector: 'dam-validation',
    template: require('./validation.component.html')
})

export class ValidationComponent implements OnInit {

    validationList: any;
    role: string;

    constructor(
        private authService: AuthService
    ) {
        this.validationList = [];
        this.role = '';
    }

    ngOnInit() { }

    checkRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }

    showvalidation(validation) {

    }

    showrevue(validation) {

    }

    showmodifier(validation) {

    }
}