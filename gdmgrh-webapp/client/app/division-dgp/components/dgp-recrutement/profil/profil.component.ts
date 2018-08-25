import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../website/service/auth.service';

@Component({
    selector: 'dgp-profil',
    template: require('./profil.component.html')
})

export class ProfilComponent implements OnInit {

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
