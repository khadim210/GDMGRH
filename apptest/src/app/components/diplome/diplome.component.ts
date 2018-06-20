import { Component, OnInit, Inject } from '@angular/core';
import { DiplomeService } from '../../services/diplome.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddformComponent } from '../addform/addform.component';
import { EditformComponent } from '../editform/editform.component';


@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.css']
})
export class DiplomeComponent implements OnInit {
diplo:any;

  constructor(private diplomeService: DiplomeService, private dialog: MatDialog) { 
    this.diplo = [];
  }

  ngOnInit() {
    this.getAllDiplomes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddformComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('popup fermé');
      this.getAllDiplomes();
    });
  }


  getAllDiplomes(): void {
  	this.diplomeService.getAllDiplomes().subscribe(data => {
  			if (data) {
	  			this.diplo = data.diplomes;
          console.log(this.diplo);
	  		}
	  	  else{
	  			this.diplo = null;
	  		}
  		
  	})
  }

  edit(event): void {
    console.log(event.target.id);
    function findbytheid(element){
      return element._id === event.target.id;
    }
    var dataselected = this.diplo.find(findbytheid);
    const dialogRef = this.dialog.open(EditformComponent, {
      width: '500px',
      data: {nom: dataselected.nom, id: dataselected._id, nomcourt: dataselected.nomcourt, niveau: dataselected.niveauequivalent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('popup fermé');
      this.getAllDiplomes();
    });
  } 

  delete(event): void {
    console.log(event.target.id);
    this.diplomeService.deleteDiplome(event.target.id).subscribe(data =>{
      console.log('supprimé');
      this.getAllDiplomes();
    })
  }

}
