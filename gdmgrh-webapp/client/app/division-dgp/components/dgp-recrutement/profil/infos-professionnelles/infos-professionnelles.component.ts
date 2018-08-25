import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../website/service/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'dgp-infos-professionnelles',
    template: require('./infos-professionnelles.component.html')
})

export class InfosProfessionnellesComponent implements OnInit {

    role: string;
    form: FormGroup;


    createForm() {
        this.form = this.formBuilder.group({
            matricule: '',
            civilite: '',
            nom: '',
            prenom: '',
            datenaissance: '',
            lieunaissance: '',
            filiation: '',
            dateentreeservice: '',
            dateliberation: '',
            grade: '',
            service: '',
        });
    }

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.role = '';
        this.createForm();
    }

    ngOnInit() {
        this.checkUserRole();
    }

    checkUserRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }
}
