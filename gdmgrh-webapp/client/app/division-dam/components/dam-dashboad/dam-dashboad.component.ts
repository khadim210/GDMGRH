import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../noyau/service/auth.service';

@Component({
    selector: 'dam-dashboad',
    template: require('./dam-dashboad.component.html')
})

export class DamDashboadComponent implements OnInit {

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
