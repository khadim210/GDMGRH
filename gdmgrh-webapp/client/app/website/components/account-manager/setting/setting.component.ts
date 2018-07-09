import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'selector-setting',
    template: require('./setting.component.html')
})

export class SettingComponent implements OnInit {

    btnUpdate: string;
    btnUpdateHidden: boolean;
    inputClass: string;
    profilModel: any;
    updatePassword: boolean;
    displayOnly: boolean;


    constructor(
        private location: Location,
        private authService: AuthService
    ) {
        this.inputClass = 'form-control-plaintext';
        this.btnUpdate = 'Modifier';
        this.btnUpdateHidden = true;
        this.profilModel = {};
        this.profilModel.agent = {};
        this.updatePassword = false;
        this.displayOnly = true;
    }

    ngOnInit() {
        this.getProfilModelInformation();
    }

    getProfilModelInformation() {
       this.profilModel = this.authService.getUser();
       if (this.profilModel.agent === null) {
           this.profilModel.agent = {};
       }
    }

    iniFormUpdate() {
        this.inputClass = 'form-control-plaintext';
        this.btnUpdate = 'Modifier';
        this.btnUpdateHidden = true;
    }

    getFormUpdate() {
        this.inputClass = 'form-control';
        this.btnUpdate = 'Modifier';
        this.btnUpdateHidden = false;
    }

    updatePasswordHandler() {
        this.updatePassword = !this.updatePassword;
    }

    goHome() {
        this.location.back();
    }
}
