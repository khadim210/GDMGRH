import { Component, OnInit } from '@angular/core';
import { DiplomesService } from '../../service/diplomes.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalData } from '../../service/globaldata';
import * as $ from 'jquery';

@Component({
    selector: 'selector-diplomes',
    template: require('./diplomes.component.html')
})

export class DiplomesComponent implements OnInit {  

  form: FormGroup;
  diplo:any;
  donnees:any;
  id:any;
  civiles:any;
  militaires:any;
  listediplomes:any;
  listespecialites:any;

  createForm(){
    this.form=this.formBuilder.group({
      nom:'',
      nomcourt:'',
      niveau:'',
      typediplome:'',
      specialite:'',
    })
  }

	constructor(private formBuilder: FormBuilder, private diplomeService: DiplomesService, private global: GlobalData){
    this.diplo = [];
    this.donnees = {
        nom: '',
        id: '',
        nomcourt: '',
        niveau:'',
        typediplome: '',
        specialite: '',
      }
    this.createForm();
    this.test();
  }

	ngOnInit() {
    this.listediplomes = this.global.listeDiplomes;
    this.listespecialites = this.global.listeSpecialites;
    this.getAllDiplomes();
    this.getCivilDiplomes();
    this.getMilitaireDiplomes();
  	}

  	
  getAllDiplomes(): void {
    this.diplomeService.getAllDiplomes().subscribe(data => {
        if (data) {
          this.diplo = data.diplomes;
        }
        else{
          this.diplo = null;
        }
      
    })
  }

  getCivilDiplomes(){
    this.diplomeService.getcivilDiplomes().subscribe(data => {
      console.log(data.diplomes);
      if (data.diplomes.length > 0) {
        this.civiles = data.diplomes;
      }
      else{
        this.civiles = null;
      }
    })
  }

  getMilitaireDiplomes(){
    this.diplomeService.getmiliDiplomes().subscribe(data => {
      console.log(data.diplomes);
      if (data.diplomes.length > 0) {
        this.militaires = data.diplomes;
      }
      else{
        this.militaires = null;
      }
    })
  }

  test(): void {
    $('#AddDiplome').on('hidden.bs.modal', function (e) {
      console.log('fermé');
    })
  }

  resetform(): void {
    this.form.reset();
    this.getAllDiplomes();
    this.getCivilDiplomes();
    this.getMilitaireDiplomes();
  }

  submit(): void {
    /*if(this.form.get('typediplome').value == 'Diplome Militaire'){
      this._niveau = 'Aucun';
    }
    else{
       this._niveau = this.form.get('niveau').value;
    }*/
    const nouveaudiplome = {
      nom:this.form.get('nom').value,
      nomcourt:this.form.get('nomcourt').value,
      niveau:this.form.get('niveau').value,
      typediplome:this.form.get('typediplome').value,
      specialite:this.form.get('specialite').value,
    }

    this.diplomeService.addNewDiplome(nouveaudiplome).subscribe(data => {
      console.log(nouveaudiplome);
      this.getAllDiplomes();
      this.getCivilDiplomes();
      this.getMilitaireDiplomes();
    })
  }

  selected_diplome(event): void {
    console.log(event.target.id);
    this.id = event.target.id;
    function findbytheid(element){
      return element._id === event.target.id;
    }
    var dataselected = this.diplo.find(findbytheid);
      this.donnees = {
        nom: dataselected.nom,
        id: dataselected._id,
        nomcourt: dataselected.nomcourt,
        niveau: dataselected.niveauequivalent,
        typediplome: dataselected.typediplome,
        specialite: dataselected.specialite,
      }

      console.log(this.donnees);

  } 

  edit(): void {
    const diplome = {
      nom:this.form.get('nom').value,
      nomcourt:this.form.get('nomcourt').value,
      niveau:this.form.get('niveau').value,
      typediplome:this.form.get('typediplome').value,
      specialite:this.form.get('specialite').value,
    }
    console.log(diplome);
     this.diplomeService.editDiplome(diplome,this.id).subscribe(data => {
        console.log('modifié');
        this.getAllDiplomes();
        this.getCivilDiplomes();
        this.getMilitaireDiplomes();
      })
  }

  delete(event): void {
    console.log(event.target.id);
    this.diplomeService.deleteDiplome(event.target.id).subscribe(data =>{
      console.log('supprimé');
      this.getAllDiplomes();
      this.getCivilDiplomes();
      this.getMilitaireDiplomes();
    })
  }

}
