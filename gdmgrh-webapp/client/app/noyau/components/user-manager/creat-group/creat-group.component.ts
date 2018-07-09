import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';
import { UserManagerEventService } from '../../../service/user-manager-event.service';

@Component({
  selector: 'app-creat-group',
  template: require('./creat-group.component.html')
})
export class CreatGroupComponent implements OnInit {

  action: any;
  groupForm: any;
  userList: any;
  uniteList: any;
  searchFound: any;
  searchOption: string;
  userSelected: any;
  searchUserForm: string;
  userListSearch: any;
  msgerror: string;

  constructor(
    private noyauService: NoyauService,
    private userManagerEventService: UserManagerEventService
  ) {
    this.groupForm = {};
    this.groupForm.users = [];
    this.userList = [];
    this.userListSearch = [];
    this.uniteList = [];
    this.searchFound = [];
    this.userSelected = [];
    this.searchOption = 'username';
    this.searchUserForm = '';
   }

  ngOnInit() {
    this.getGroupData();
    this.getItemGroupeSelected();
  }

  getItemGroupeSelected() {
    this.userManagerEventService.groupeAnnounced.subscribe(_groupe => {
      if (_groupe.action && _groupe.groupe) {
        this.action = _groupe.action;
        this.userListSearch = this.userList;
        this.searchFound = [];
        this.userSelected = [];
        if (_groupe.action === 'modifier') {
          var groupe = {..._groupe.groupe};
          this.userSelected = groupe.users;
          this.groupForm = groupe;
          this.groupForm.users = [];
          this.searchUserForm = '';
          for (let key = 0; key < this.userSelected.length; key++) {
            this.userListSearch = this.userListSearch.filter(_user => this.userSelected[key]._id !== _user._id);
            this.groupForm.users.push(this.userSelected[key]._id);
          }
        } else {
          this.groupForm = _groupe.groupe;
        }
      }
    });
  }

  getGroupData() {
    this.uniteList = ['DAM', 'DCC', 'DGP', 'DIF'];
    this.noyauService.getGroupData().subscribe(res => {
      if (res.response) {
        for (let index = 0; index < res.response.length; index++) {
          if (res.response[index].role !== 'admin') {
            this.userList.push(res.response[index]);
          }
        }
      }
      this.userListSearch = this.userList;
    });
  }

  addGroup() {
    console.log(this.groupForm);
    this.noyauService.createdUserGroup(this.groupForm).subscribe(res => {
      if (res.response) {
        this.userManagerEventService.confirmGroupe({groupe: res.response});
        this.groupForm = {};
        this.groupForm.users = [];
      } else if (res.error) {
        this.msgerror = res.error;
      }
    });
  }

  updateGroup() {
    console.log(this.groupForm);
    this.noyauService.updateUserGroup(this.groupForm).subscribe(res => {
      if (res.response) {
        this.userManagerEventService.confirmGroupe({groupe: res.response});
      } else if (res.error) {
        this.msgerror = res.error;
      }
    });
  }

  deleteUserName(user) {
    this.userSelected = this.userSelected.filter(_user => user._id !== _user._id);
    this.groupForm.users = this.groupForm.users.filter(_user => user._id !== _user);
    this.userListSearch.push(user);
    this.searchUserForm = '';
    this.searchFound = [];
  }

  optionSelected(option = '') {
    this.searchOption = option;
  }

  selectUser(user) {
    this.searchFound = [];
    this.searchUserForm = '';
    this.userSelected.push(user);
    this.groupForm.users.push(user._id);
    this.userListSearch = this.userListSearch.filter(_user => user !== _user);
  }

  searchUser(input = '') {
    var _allUser = this.userListSearch;
    this.searchFound = [];
    input = input.toUpperCase();
    this.filterTable(_allUser, `${input}`);
    if (input === '') {
      this.searchFound = [];
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      if (this.searchOption) {
        for (let index = 0; index < table.length; index++) {
          if (table[index][`${this.searchOption}`]._id) {
            if (this.matchString((table[index][`${this.searchOption}`].name).toUpperCase(), input)) {
              this.searchFound.push(table[index]);
            }
          } else {
            if (this.matchString((table[index][`${this.searchOption}`]).toUpperCase(), input)) {
              this.searchFound.push(table[index]);
            }
          }
        }
      }
    }
  }

  matchString(string1, string2) {
      if (RegExp(string2).test(string1.toString())) {
        return true;
      }
    return false;
  }

}
