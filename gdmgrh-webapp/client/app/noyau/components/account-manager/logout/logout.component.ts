import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-logout',
    template: require('./logout.component.html')
})

export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/account/sign-in']);
    }
}
