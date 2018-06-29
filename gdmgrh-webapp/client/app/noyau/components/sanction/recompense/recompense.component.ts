import { Component, OnInit } from '@angular/core';
import { RecompenseModel } from '../../../model/recompense.model';
import { SanctionService } from '../../../service/sanction.service';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs/observable/interval';

@Component({
    selector: 'selector-recompense',
    template: require('./recompense.component.html')
})
export class RecompenseComponent implements OnInit {

    datas: RecompenseModel[];
    recompenses: RecompenseModel[];

    libelles: any;
    recompense_edited: RecompenseModel;
    nom_recompense_edited: String;
    type_recompense_edited: String;
    code_deleted: any;
    succes_action = false;

  constructor(
      private sanctionService: SanctionService
    ) {
        this.datas = [];
        this.recompenses = [];
        this.libelles = [];
    }


  ngOnInit() {
    this.sanctionService.getRecompenses()
      .subscribe(data => this.datas = data);

      // for (let _i = 0; _i < data.length; _i++) {
          // for (let _j = 0; _j < data[_i].intitules.length; _j++) {
            // tslint:disable-next-line:max-line-length
            // this.datas.push({_id: data[_i].intitules[_j]['_id'], nom_recompense: data[_i].intitules[_j]['nom_recompense'], type_recompense: data[_i].type_recompense});
          // }
        // }
  }
  btnEdit(item: RecompenseModel): void {
    this.recompense_edited = item;
    this.nom_recompense_edited = item.nom_recompense;
    this.type_recompense_edited = item.type_recompense;
  }

  btnDelete(item: any): void {
    this.code_deleted = item;
  }

  delete(): void {
    // tslint:disable-next-line:prefer-const
    let index = this.datas.indexOf(this.code_deleted);

    if (index >= 0) {
      this.datas.splice(index, 1);
      this.sanctionService.deleteRecompense(this.code_deleted._id)
      .subscribe(
        data => {
          this.alert_action();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  editerRecompense(type_rec, nom_rec): void {
    this.recompense_edited.type_recompense = type_rec;
    this.recompense_edited.nom_recompense = nom_rec;

    this.sanctionService.editRecompense(this.recompense_edited)
    .subscribe(
      data => {
        this.alert_action();
      }
    );
  }

  recordRecompense(item: NgForm): void {
    const tamponRecompense = {
      type_recompense: item.value.type_recompense,
      nom_recompense: item.value.nom_recompense

    };
    this.sanctionService.addRecompense((tamponRecompense) as RecompenseModel)
      .subscribe(
        data => {
          this.datas.push({_id: data[' _id '], nom_recompense: data[' nom_recompense '], type_recompense: data[' type_recompense ']});
          this.alert_action();
        }
      );
  }

  alert_action() {
    this.succes_action = true;
    interval(6500)
      .subscribe(res => this.succes_action = false);
  }

}
