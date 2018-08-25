import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../website/service/auth.service';

@Component({
    selector: 'dgp-reserviste',
    template: require('./dgp-reserviste.component.html')
})

export class DgpReservisteComponent implements OnInit {

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
