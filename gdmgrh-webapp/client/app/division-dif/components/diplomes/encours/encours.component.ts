import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-encours',
    template: require('./encours.component.html')
})

export class EncoursComponent implements OnInit {
    form: FormGroup;


	createForm() {
    this.form = this.formBuilder.group({
      libelle: '',
      demande: '',
      imputee: '',
      matricule: '',
      nom: '',
      prenom: '',
      service: '',
      datedemande: '',
    });
  }

    constructor(private formBuilder: FormBuilder) { 
    	this.createForm();
    }

    ngOnInit() { }
}
