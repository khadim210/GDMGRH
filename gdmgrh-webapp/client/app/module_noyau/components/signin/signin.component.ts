import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

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
        console.log(this.signinModel);
        this.authService.signin(this.signinModel).subscribe(res => {
            console.log(res);
            if (res.response) {
                const response = res.response;
                if (response.role === 'admin') {
                    this.authService.save(response);
                    this.router.navigate(['/users/']);
                }
            } else if (res.error) {
                this.msgerror = res.error;
            }
        });
        //this.router.navigate(['/users/']);
    }
}
