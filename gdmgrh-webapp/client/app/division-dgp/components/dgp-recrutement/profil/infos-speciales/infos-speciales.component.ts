import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../website/service/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'dgp-infos-speciales',
    template: require('./infos-speciales.component.html')
})

export class InfosSpecialesComponent implements OnInit {

    role: string;
    form: FormGroup;


    createForm() {
        this.form = this.formBuilder.group({
            diplome: '',
            libellediplome: '',
            specialite: '',
            stages: '',
            permis_conduire: '',
            langues: '',
            personnes_prevenir: '',
            datemariage: '',
            nomconjoint: '',
            datenaissanceconjoint: '',
            lieunaissanceconjoint: '',
            datedivorce: '',
            suivant: '',
            dateremariage: '',
            nom_conjoint: '',
            datenaissance_conjoint: '',
            lieunaissance_conjoint: '',
            autreslangues: '',
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
