import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-concours-examens',
    template: require('./concours-examens.component.html')
})

export class ConcoursExamComponent implements OnInit {
	form: FormGroup;


	  createForm() {
    this.form = this.formBuilder.group({
      libelle: '',
      categorie: '',
      datedebut: '',
      datefin: '',
      lieu: '',
      note: '',
    });
  }

    constructor(private formBuilder: FormBuilder) { 
    	this.createForm();
	}

    ngOnInit() { }

    submit(): void {
    	
    }
}
