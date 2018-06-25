import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'selector-signin',
    template: require('./signin.component.html')
})

export class SigninComponent implements OnInit {

    signinModel: any;

    constructor(
        private router: Router
    ) {
        this.signinModel = {};
    }

    ngOnInit() { }

    signin() {
        console.log(this.signinModel);
        this.router.navigate(['/users/account']);
    }
}
