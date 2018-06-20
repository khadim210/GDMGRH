import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiplomeService } from '../../services/diplome.service';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {
form: FormGroup;
nom: String;
nomcourt: String;
niveau: String;

	createForm(){
		this.form=this.formBuilder.group({
			nom:'',
			nomcourt:'',
			niveau:'',
		})
	}

  constructor(
    private dialogRef: MatDialogRef<AddformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private diplomeService: DiplomeService ) {
    	this.createForm();
    }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const nouveaudiplome = {
    	nom:this.form.get('nom').value,
    	nomcourt:this.form.get('nomcourt').value,
    	niveau:this.form.get('niveau').value,
    }

    this.diplomeService.addNewDiplome(nouveaudiplome).subscribe(data => {
    	console.log('ajouté');
    	this.dialogRef.close();
    })
  }

  ngOnInit() {
  }

}
