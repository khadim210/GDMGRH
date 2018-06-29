import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../noyau/service/auth.service';

@Injectable()
export class GeneralGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(state.url.toString());
        if ( (RegExp('\/account/setting\/').test(state.url.toString())) ) {
            return true;
        }
        if (!this.authService.getUser()) {
            return false;
        }
        if (this.authService.getUser().role === 'RH') {
            return true;
        }
        this.authService.logout();
        this.router.navigate(['/account/sign-in']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}
