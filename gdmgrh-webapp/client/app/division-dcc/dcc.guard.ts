import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../website/service/auth.service';

@Injectable()
export class DccGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isConnected() && this.authService.getUser().group === 'DCC') {
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
