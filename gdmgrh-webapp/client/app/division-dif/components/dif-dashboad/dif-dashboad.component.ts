import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../noyau/service/auth.service';

@Component({
    selector: 'dif-dashboad',
    template: require('./dif-dashboad.component.html')
})

export class DifDashboadComponent implements OnInit {

    role: string;

    constructor(
        private authService: AuthService
    ) {
        this.role = '';
    }

    ngOnInit() {
        this.checkUserRole();
    }

    checkUserRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }
}
