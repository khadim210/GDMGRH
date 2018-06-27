import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'selector-logout',
    template: require('./logout.component.html')
})

export class LogoutComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    logout() {
        console.log('logout');
        this.router.navigate(['/signin']);
    }
}
