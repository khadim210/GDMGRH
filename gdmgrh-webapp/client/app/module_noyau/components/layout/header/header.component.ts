import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'selector-header',
    template: require('./header.component.html')
})

export class HeaderComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    setting() {
        console.log('setting');
        //this.router.navigate(['/users/signin']);
    }
}
