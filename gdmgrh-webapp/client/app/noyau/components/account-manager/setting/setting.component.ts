import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'selector-setting',
    template: require('./setting.component.html')
})

export class SettingComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    goHome() {
        this.router.navigate(['/noyau/dashboad']);
    }
}
