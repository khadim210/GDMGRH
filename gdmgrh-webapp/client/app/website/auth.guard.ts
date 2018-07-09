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

            if (RegExp('\/account/setting').test(state.url.toString())) {
                return true;
            }

            switch (this.authService.getUser().group) {
                case 'admin': {
                    this.router.navigate(['/noyau/dashboad']);
                    break;
                }
                case 'DAM': {
                    this.router.navigate(['/dam/dashboad']);
                    break;
                }
                case 'DCC': {
                    this.router.navigate(['/dcc/dashboad']);
                    break;
                }
                case 'DGP': {
                    this.router.navigate(['/dgp/dashboad']);
                    break;
                }
                case 'DIF': {
                    this.router.navigate(['/dif/dashboad']);
                    break;
                }
                default: {
                    this.authService.logout();
                    this.router.navigate(['/account/sign-in']);
                    break;
                }
            }
            return false;
        } else {
            if (RegExp('\/account/setting').test(state.url.toString())) {
                return false;
            }
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}
