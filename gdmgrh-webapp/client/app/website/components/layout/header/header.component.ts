import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-header',
    template: require('./header.component.html')
})

export class HeaderComponent implements OnInit {

    userProfile: any;
    nameUserConnected: string;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.userProfile = {};
        this.nameUserConnected = '';
    }

    ngOnInit() {
        this.getUserProfile();
    }

    getUserProfile() {
        this.userProfile = this.authService.getUser();
        if (this.userProfile) {
            this.userProfile.agent ?
                this.nameUserConnected = this.userProfile.agent.name :
                this.nameUserConnected = this.userProfile.username;
        } else {
            //this.router.navigate(['/account/sign-in']);
        }
    }

    setting() {
        console.log('setting');
        this.router.navigate(['/account/setting']);
    }
}
