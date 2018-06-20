import { Component, OnInit, Inject } from '@angular/core';
import { GradesService } from '../../services/grades.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddgradeformComponent } from '../addgradeform/addgradeform.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
grades: any;
  constructor(private gradeService: GradesService, private dialog: MatDialog) {
  	//this.grades = [];
   }

  ngOnInit() {
  	this.getAllGrades();
  }

  getAllGrades(): void {
  	console.log('ok');
  	this.gradeService.getAllGrades().subscribe(data => {
  		if(data.grades.length != 0){
  			this.grades = data.grades;
  		}
  		else{
  			this.grades = null;
  		}
  	})
  }

  openDialog(): void {
  	const dialogRef = this.dialog.open(AddgradeformComponent, {
  		width: '500px',
  	});
  	dialogRef.afterClosed().subscribe(result => {
  		this.getAllGrades();
  	});
  }

}

/*


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
*/