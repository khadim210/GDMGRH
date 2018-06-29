import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';

@Component({
  selector: 'app-list-users',
  template: require('./list-users.component.html')
})
export class ListUsersComponent implements OnInit {

  userList: any;
  userListSearch: any;
  searchOption: string;
  userItem: any;
  adminProfil: any;
  btnModal: string;

  constructor(
    private noyauService: NoyauService
  ) {
    this.userList = [];
    this.adminProfil = {};
    this.userItem = {};
    //this.userItem.role = [];
    this.btnModal = 'ajouter';
    this.userListSearch = [];
    this.searchOption = 'username';
   }

  ngOnInit() {
    this.getAllUsers();
  }

  showUser(user): void {
    this.userItem = {...user};
    this.btnModal = 'modifier';
  }

  getAllUsers(): void {
    this.noyauService.getUsers().subscribe( res => {
      if (res.response) {
        for (let index = 0; index < res.response.length; index++) {
          if (res.response[index].role !== 'admin') {
            this.userList.push(res.response[index]);
          } else {
            this.adminProfil = res.response[index];
          }
          this.userListSearch = this.userList;
        }
      }
    });
  }

  handlerUserEmit(userEmit) {
    this.userList = [];
    for (let index = 0; index < userEmit.user.length; index++) {
      if (userEmit.user[index].role !== 'admin') {
        this.userList.push(userEmit.user[index]);
      } else {
        this.adminProfil = userEmit.user;
      }
    }
  }

  searchRole(input) {
    this.userList = [];
    if (input !== '') {
      this.filterTable(this.userListSearch, `${input}`);
    } else {
      this.userList = this.userListSearch;
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      for (let index = 0; index < table.length; index++) {
        if (table[index][`${this.searchOption}`]._id) {
          if (this.matchString(table[index][`${this.searchOption}`].name, input)) {
            this.userList.push(table[index]);
          }
        } else {
          if (this.matchString(table[index][`${this.searchOption}`], input)) {
            this.userList.push(table[index]);
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

  closeModal(): void {
    this.userItem = {};
    this.userItem.rule = [];
    this.btnModal = 'ajouter';
  }
}
