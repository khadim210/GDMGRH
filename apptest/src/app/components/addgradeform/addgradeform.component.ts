import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiplomeService } from '../../services/diplome.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-addgradeform',
  templateUrl: './addgradeform.component.html',
  styleUrls: ['./addgradeform.component.css']
})
export class AddgradeformComponent implements OnInit {
form: FormGroup;
categories:any = [
	{
		nom: 'OFFICIER',
		niveau: [
			{nom: 'GENERAL'},
			{nom:'SUPERIEUR'}
		]
},
];
niveaux: any;

createForm(){
		this.form=this.formBuilder.group({
			categorie:'',
			niveau:'',
			nomgrade:'',
			codegrade:'',
		})
	}
  constructor(private dialogRef: MatDialogRef<AddgradeformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private diplomeService: DiplomeService) { 
  	this.createForm();
  }

  ngOnInit() {
  }

  getCategorie($event): void {
  	console.log('ok');
  	$('#niveau')
    .find('option')
    .remove()
    .end();
		const cat = this.form.get('categorie').value;
		function findthecat(element){
	      return element.nom == cat;
	    }
	    var dataselected = this.categories.find(findthecat);
		this.niveaux = dataselected.niveau;
  }


}
