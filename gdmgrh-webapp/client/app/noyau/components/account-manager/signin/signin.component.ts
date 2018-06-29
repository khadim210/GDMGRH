import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-signin',
    template: require('./signin.component.html')
})

export class SigninComponent implements OnInit {

    signinModel: any;
    msgerror: string;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.signinModel = {};
        this.msgerror = '';
    }

    ngOnInit() { }

    signin() {
        this.authService.signin(this.signinModel).subscribe(res => {
            if (res.response) {
                const response = res.response;
                if (response.role === 'admin') {
                    this.authService.save(response);
                    this.router.navigate(['/noyau/']);
                } else {
                    if (response.agent.unite === 'DAM') {
                        this.authService.save(response);
                        this.router.navigate(['/dam/']);
                    } else if (response.agent.unite === 'DCC') {
                        this.authService.save(response);
                        this.router.navigate(['/dcc/']);
                    } else if (response.agent.unite === 'DGP') {
                        this.authService.save(response);
                        this.router.navigate(['/dgp/']);
                    } else if (response.agent.unite === 'DIF') {
                        this.authService.save(response);
                        this.router.navigate(['/dif/']);
                    } else {
                        this.msgerror = 'Vous avez pas droit, veuillez prendre contact avec l\'administrateur';
                    }
                }
            } else if (res.error) {
                this.msgerror = res.error;
            }
        });
    }
}
