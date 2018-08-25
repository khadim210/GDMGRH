import { Component, OnInit } from '@angular/core';
import { GradesService } from '../../service/grades.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'selector-grades',
  template: require('./grades.component.html')
})

export class GradesComponent implements OnInit {
  formgrade: FormGroup;
  categories: any;
  allniveaux: any;
  niveaux: any;
  grades: any;

  createForm() {
    this.formgrade = this.formBuilder.group({
      categorie: '',
      niveau: '',
      nomgrade: '',
      codegrade: '',
    });
  }


  constructor(private formBuilder: FormBuilder, private gradeService: GradesService) {
    this.createForm();
    /*this.niveaux = {
     nomniveau: '',
     id: ''
   }*/
 }

 ngOnInit() {
   this.getAllCategories();
   this.getAllNiveaux();
   this.getAllGrades();
 }

 getAllCategories(): void {
   this.gradeService.getAllCat().subscribe(data => {
     this.categories = data.categories;
   });
 }

 getAllNiveaux(): void {
   this.gradeService.getAllNiv().subscribe(data => {
     this.allniveaux = data.niveaux;
   });
 }

 getAllGrades(): void {
   this.gradeService.getAllGrades().subscribe(data => {
     this.grades = data.grades;
   });
 }

 showNiveaux(event): void {
   var tab = this.allniveaux.filter(
     niv => niv.categorie === event.target.value);
   if (tab.length > 0) {
     this.niveaux = tab;
   }
 }


 submit(): void {

   const nouveaugrade = {
     categorie: this.formgrade.get('categorie').value,
     niveau: this.formgrade.get('niveau').value,
     nomgrade: this.formgrade.get('nomgrade').value,
     codegrade: this.formgrade.get('codegrade').value,
   };

   this.gradeService.addNewGrade(nouveaugrade).subscribe(data => {
     this.getAllGrades();
   });
 }

 delete(event): void {
   this.gradeService.deleteGrade(event.target.id).subscribe(data => {
     this.getAllGrades();
   });
 }

 resetform(): void {
   this.formgrade.reset();
   this.getAllGrades();
 }

}
