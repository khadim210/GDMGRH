import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isConnected()) {
            if ( (RegExp('\/account/setting\/*').test(state.url.toString())) ) {
                return true;
            }
            switch (this.authService.getUser().role) {
                case 'admin': {
                    this.router.navigate(['/noyau/dashboad']);
                    break;
                }
                default: {
                    this.authService.logout();
                    break;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}
