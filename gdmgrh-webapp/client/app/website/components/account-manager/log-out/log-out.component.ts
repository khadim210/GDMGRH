import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-log-out',
    template: require('./log-out.component.html')
})

export class LogOutComponent implements OnInit {

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
