import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../website/service/auth.service';

@Injectable()
export class DifGuard implements CanActivate, CanActivateChild {
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
        if (this.authService.getUser().agent) {
            if (this.authService.getUser().agent.unite === 'DIF') {
                return true;
            }
        }
        this.authService.logout();
        this.router.navigate(['/account/sign-in']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }
}
