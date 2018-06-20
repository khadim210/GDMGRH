import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiplomeService } from '../../services/diplome.service';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {

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
    private dialogRef: MatDialogRef<EditformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private diplomeService: DiplomeService ) {
    	this.createForm();
    }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(event): void {
  	const id = event.target.id;
    const diplome = {
    	nom:this.form.get('nom').value,
    	nomcourt:this.form.get('nomcourt').value,
    	niveau:this.form.get('niveau').value,
    }
      this.diplomeService.editDiplome(diplome,id).subscribe(data => {
        console.log('modifié');
        this.dialogRef.close();
      })
      this.dialogRef.close();


  }

  ngOnInit() {
  }

}
