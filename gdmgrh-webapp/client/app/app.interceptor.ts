import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './module_noyau/service/auth.service';
import { apiUrl } from './app.constants';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    private headers: HttpHeaders;
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isConnected()) {
            this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getUser().token});
        } else {
            this.headers = new HttpHeaders({});
        }
        req = req.clone({url: apiUrl + req.url, headers: this.headers});
        return next.handle(req).pipe(
            tap(
                event => {},
                error => {
                    if (401 === error.status) {
                        this.router.navigate(['/sign-in']);
                    }
                }
            )
        );
    }
}
