import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-stages',
    template: require('./stages.component.html')
})

export class StagesComponent implements OnInit {
    form: FormGroup;


	createForm() {
    this.form = this.formBuilder.group({
      libelle: '',
      organisateur: '',
      datedebut: '',
      datefin: '',
      lieu: '',
      reference: '',
    });
  }

    constructor(private formBuilder: FormBuilder) { 
    	this.createForm();
    }

    ngOnInit() { }
}
