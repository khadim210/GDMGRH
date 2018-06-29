import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './service/auth.service';

@Injectable()
export class NoyauGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.getUser()) {
            return false;
        }
        if (this.authService.isConnected() && this.authService.getUser().role === 'admin') {
            return true;
        } else {
            this.authService.logout();
            this.router.navigate(['/account/sign-in']);
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}