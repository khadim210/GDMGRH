import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-designations',
    template: require('./designations.component.html')
})

export class DesignationsComponent implements OnInit {
    form: FormGroup;


	createForm() {
    this.form = this.formBuilder.group({
      matricule: '',
      nom: '',
      prenom: '',
      service: '',
      stage: '',
      grade: '',
    });
  }

    constructor(private formBuilder: FormBuilder) { 
    	this.createForm();
    }

    ngOnInit() { }
}
