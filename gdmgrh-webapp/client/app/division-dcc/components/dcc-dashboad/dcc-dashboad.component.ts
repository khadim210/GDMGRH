import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../noyau/service/auth.service';

@Component({
    selector: 'dcc-dashboad',
    template: require('./dcc-dashboad.component.html')
})

export class DccDashboadComponent implements OnInit {

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
