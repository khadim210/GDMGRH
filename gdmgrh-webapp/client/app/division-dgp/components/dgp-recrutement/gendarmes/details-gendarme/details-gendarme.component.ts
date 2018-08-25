import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../website/service/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DgpService } from '../../../../service/dgp.service';

@Component({
    selector: 'dgp-details-gendarme',
    template: require('./details-gendarme.component.html')
})

export class DetailsGendarmesComponent implements OnInit {

    role: string;
    form: FormGroup;
    _langues: any;
    civiles: any;
    _id: any;
    agentInfos: any;


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

        this.agentInfos = {
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
        };
    }

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private dgpService: DgpService,
        private route: ActivatedRoute
        ) {
        this.route.params.subscribe( params => {
            this._id = params['id'];
        });
        this.role = '';
        this._langues = [];
        this.createForm();
    }

    ngOnInit() {
        this.checkUserRole();
        this.getCivilDiplomes();
        this.getOneAgent();
    }

    checkUserRole() {
        if (this.authService.getUser().role) {
            this.role = this.authService.getUser().role;
        }
    }

    getOneAgent(): void {
        this.dgpService.getOneAgent(this._id).subscribe(data => {
            
            if(data.agent){
                console.log("ok");
                //this.agentInfos = data.agent;
                this.agentInfos = {
                    matricule: data.agent.matricule,
                    civilite: data.agent.civilite,
                    nom: data.agent.nom,
                    prenom: data.agent.prenom,
                    datenaissance: data.agent.datenaissance,
                    lieunaissance: data.agent.lieunaissance,
                    filiation: data.agent.filiation,
                    dateentreeservice: data.agent.dateentreeservice,
                    dateliberation: data.agent.dateliberation,
                    grade: data.agent.grade,
                    service: data.agent.service,
                    diplome: data.agent.diplome,
                    libellediplome: data.agent.libellediplome,
                    specialite: data.agent.specialite,
                    stages: data.agent.stages,
                    permis_conduire: data.agent.permis_conduire,
                    langues: data.agent.langues,
                    personnes_prevenir: data.agent.personnes_prevenir,
                    datemariage: data.agent.datemariage,
                    nomconjoint: data.agent.nomconjoint,
                    datenaissanceconjoint: data.agent.datenaissanceconjoint,
                    lieunaissanceconjoint: data.agent.lieunaissanceconjoint,
                    datedivorce: data.agent.datedivorce,
                    suivant: data.agent.suivant,
                    dateremariage: data.agent.dateremariage,
                    nom_conjoint: data.agent.nom_conjoint,
                    datenaissance_conjoint: data.agent.datenaissance_conjoint,
                    lieunaissance_conjoint: data.agent.lieunaissance_conjoint,
                    autreslangues: data.agent.autreslangues,
                };
                console.log(this.agentInfos);
            }
            else {
                console.log("non ok");
                this.agentInfos = null;
            }
        })
    }

    getCivilDiplomes() {
        this.dgpService.getcivilDiplomes().subscribe(data => {
            if (data.diplomes) {
                this.civiles = data.diplomes;
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
    }
}
