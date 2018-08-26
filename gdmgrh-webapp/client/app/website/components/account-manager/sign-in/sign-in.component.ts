import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-sign-in',
    template: require('./sign-in.component.html')
})

export class SignInComponent implements OnInit {

    signinModel: any;
    msgerror: string;
    btnLogin: string;
    btnClass: string;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.signinModel = {};
        this.msgerror = '';
        this.btnClass = 'btn-outline-primary ';
        this.btnLogin = 'Connexion';
    }

    ngOnInit() { }

    signin() {
        this.btnClass = 'btn-primary';
        this.btnLogin = 'Authentification';
        this.authService.signin(this.signinModel).subscribe(res => {
            if (res.user) {
                const response = res.user;
                if (response.group === 'admin') {
                    this.authService.save(response);
                    this.router.navigate(['/noyau/']);
                } else {
                    if (response.group === 'DAM') {
                        this.authService.save(response);
                        this.router.navigate(['/dam/']);
                    } else if (response.group === 'DCC') {
                        this.authService.save(response);
                        this.router.navigate(['/dcc/']);
                    } else if (response.group === 'DGP') {
                        this.authService.save(response);
                        this.router.navigate(['/dgp/']);
                    } else if (response.group === 'DIF') {
                        this.authService.save(response);
                        this.router.navigate(['/dif/']);
                    } else {
                        this.msgerror = 'Vous avez pas droit, veuillez prendre contact avec l\'administrateur';
                    }
                }
            } else if (422 === res.status) {
                this.msgerror = res.error.message;
            } else if (500 === res.status) {
                this.msgerror = res.error.message;
            }
        });
        this.btnClass = 'btn-outline-primary ';
        this.btnLogin = 'Connexion';
    }
}
