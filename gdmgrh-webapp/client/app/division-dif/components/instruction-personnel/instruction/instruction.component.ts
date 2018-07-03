import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'selector-instruction',
    template: require('./instruction.component.html')
})

export class InstructionComponent implements OnInit {
	 form: FormGroup;


	  createForm() {
    this.form = this.formBuilder.group({
      intitule: '',
      unite: '',
      description: '',
      date: '',
    });
  }

    constructor(private formBuilder: FormBuilder) { 
    	this.createForm();
	}

    ngOnInit() { }


  submit(): void {

  }
}
