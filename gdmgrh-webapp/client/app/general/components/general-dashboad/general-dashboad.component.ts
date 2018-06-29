import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../noyau/service/auth.service';

@Component({
    selector: 'general-dashboad',
    template: require('./general-dashboad.component.html')
})

export class GeneralDashboadComponent implements OnInit {

    role: string;

    constructor(
        private authService: AuthService
    ) {
        this.role = '';
    }

    ngOnInit() {}
}
