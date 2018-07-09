import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';
import { UserManagerEventService } from '../../../service/user-manager-event.service';

@Component({
  selector: 'app-list-group',
  template: require('./list-group.component.html')
})
export class ListGroupComponent implements OnInit {

  groupeList: any;
  groupeListSearch: any;
  groupeItem: any;
  btnModal: string;
  search: any;

  constructor(
    private noyauService: NoyauService,
    private userManagerEventService: UserManagerEventService
  ) {
    this.groupeList = [];
    this.groupeListSearch = [];
    this.groupeItem = {};
    this.groupeItem.users = [];
    this.btnModal = 'ajouter';
    this.search = {};
    this.search.option = '';
  }

  ngOnInit() {
    this.getGroupe();
    this.handlerGroupeEmit();
  }

  annonceGroupe(group = {}, _action = 'modifier') {
    this.userManagerEventService.announceGroupe({groupe: {...group}, action: _action});
  }

  getGroupe() {
    this.noyauService.getUsersGroup().subscribe(res => {
      if (res.response) {
        this.groupeList = res.response;
      }
      this.groupeListSearch = this.groupeList;
    });
  }

  handlerGroupeEmit() {
    this.userManagerEventService.groupeConfirmed.subscribe(_groupe => {
      this.groupeList = _groupe.groupe;
    });
  }

  searchChange(input) {
    this.search.field = '';
    this.search.option = input;
    this.groupeList = this.groupeListSearch;
  }

  searchGroupe(input) {
    this.groupeList = [];
    if (input !== '') {
      this.filterTable(this.groupeListSearch, `${input.toUpperCase()}`);
    } else {
      this.groupeList = this.groupeListSearch;
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      for (let index = 0; index < table.length; index++) {
        if (table[index][`${this.search.option}`]._id) {
          if (this.matchString((table[index][`${this.search.option}`].name).toUpperCase(), input)) {
            this.groupeList.push(table[index]);
          }
        } else {
          if (this.matchString((table[index][`${this.search.option}`]).toUpperCase(), input)) {
            this.groupeList.push(table[index]);
          }
        }
      }
    }
  }

  matchString(string1, string2) {
    if (RegExp(string2).test(string1)) {
      return true;
    }
    return false;
  }

  addGroupeModal() {
    this.groupeItem = {};
    this.groupeItem.users = [];
    this.annonceGroupe(this.groupeItem, 'ajouter');
  }
}
