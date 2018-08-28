import { Component, OnInit } from '@angular/core';
import { RecompenseModel } from '../../../model/recompense.model';
import { SanctionService } from '../../../service/sanction.service';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs/observable/interval';

@Component({
    selector: 'selector-recompense',
    template: require('./recompense.component.html'),
    styles: [`
      @keyframes masuperanimation {
        0% {
            transform: translateX(150px);
        }
        -50% {
            transform: translateX(150px);
        }
        -100% {
            transform: translateX(150px) rotate(15deg);
        }
      }
      .w3-display-topright {
        position: absolute;
        right: 0;
        top: 0
      }
      .w3-padding {
        padding: 8px 16px!important
      }
      .alert {
        animation: masuperanimation 2s;
      }

    `]
})
export class RecompenseComponent implements OnInit {

    recompense_data: any[];
    recompense_edited: RecompenseModel;
    nom_recompense_edited: String;
    type_recompense_edited: String;
    code_to_delete: any;

  constructor(
      private sanctionService: SanctionService
    ) {
        this.recompense_data = [];
    }


  ngOnInit() {
    this.sanctionService.getRecompenses()
      .subscribe((data) => {
        this.recompense_data = data;
        console.log(data)
      });
  }
  btnEdit(item: RecompenseModel): void {
    this.recompense_edited = item;
    this.nom_recompense_edited = item.nom_recompense;
    this.type_recompense_edited = item.type_recompense;
  }

  btnDelete(item: any): void {
    this.code_to_delete = item;
  }

  deleteRecompense(): void {
    this.sanctionService.deleteRecompense(this.code_to_delete._id)
    .subscribe(
      data => {
        this.recompense_data = data;
      }, error => {
        console.log(error);
      }
    );
  }

  upgradeRecompense(type_rec, nom_rec): void {
    this.recompense_edited.type_recompense = type_rec;
    this.recompense_edited.nom_recompense = nom_rec;

    this.sanctionService.editRecompense(this.recompense_edited)
    .subscribe(
      data => {
        this.recompense_data = data;
      }
    );
  }

  addRecompense(item: NgForm): void {
    const tamponRecompense = {
      type_recompense: item.value.type_recompense,
      nom_recompense: item.value.nom_recompense

    };
    this.sanctionService.addRecompense((tamponRecompense) as RecompenseModel)
      .subscribe(
        data => {
          this.recompense_data = data;
        }
      );
  }

}
