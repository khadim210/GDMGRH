import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../website/service/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DgpService } from '../../../../service/dgp.service';

@Component({
    selector: 'dgp-infos-generales',
    template: require('./infos-generales.component.html')
})

export class InfosGeneralesComponent implements OnInit {

    role: string;
    form: FormGroup;
    _langues: any;
    civiles: any;


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
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private dgpService: DgpService,
        ) {
        this.role = '';
        this._langues = [];
        this.createForm();
    }

    ngOnInit() {
        this.checkUserRole();
        this.getCivilDiplomes();
    }

    checkUserRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }

    getCivilDiplomes() {
        this.dgpService.getcivilDiplomes().subscribe(data => {
            if (data.diplomes) {
                this.civiles = data.diplomes;
                console.log(this.civiles);
            } else {
                this.civiles = null;
            }
        });
    }

    submit():void {
        this._langues.push(this.form.get('autreslangues').value);
        const gendarme = {
            matricule: this.form.get('matricule').value,
            civilite: this.form.get('civilite').value,
            nom: this.form.get('nom').value,
            prenom: this.form.get('prenom').value,
            datenaissance: this.form.get('datenaissance').value,
            lieunaissance: this.form.get('lieunaissance').value,
            filiation: this.form.get('filiation').value,
            dateentreeservice: this.form.get('dateentreeservice').value,
            dateliberation: this.form.get('dateliberation').value,
            grade: this.form.get('grade').value,
            service: this.form.get('service').value,

            diplome: this.form.get('diplome').value,
            libellediplome: this.form.get('libellediplome').value,
            specialite: this.form.get('specialite').value,
            stages: this.form.get('stages').value,
            permis_conduire: this.form.get('permis_conduire').value,
            langues: this._langues,
            personnes_prevenir: this.form.get('personnes_prevenir').value,
            datemariage: this.form.get('datemariage').value,
            nomconjoint: this.form.get('nomconjoint').value,
            datenaissanceconjoint: this.form.get('datenaissanceconjoint').value,
            lieunaissanceconjoint: this.form.get('lieunaissanceconjoint').value,
            datedivorce: this.form.get('datedivorce').value,
            suivant: this.form.get('suivant').value,
            dateremariage: this.form.get('dateremariage').value,
            nom_conjoint: this.form.get('nom_conjoint').value,
            datenaissance_conjoint: this.form.get('datenaissance_conjoint').value,
            lieunaissance_conjoint: this.form.get('lieunaissance_conjoint').value,
        };

        console.log(gendarme);
        this.dgpService.addGendarme(gendarme).subscribe(data => {
            
        });
        //this.router.navigate(['dgp/recrutement/profil/infos-speciales']);
    }


    onchange(event): void {
        if (event.target.checked == true) {
            this._langues.push(event.target.value);
        }
        else {
            this._langues.forEach( (item, index) => {
                if(item === event.target.value) this._langues.splice(index,1);
            });
        }
        console.log(this._langues);
    }
}
