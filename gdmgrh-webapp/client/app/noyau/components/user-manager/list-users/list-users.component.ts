import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';
import { UserManagerEventService } from '../../../service/user-manager-event.service';

@Component({
  selector: 'app-list-users',
  template: require('./list-users.component.html')
})
export class ListUsersComponent implements OnInit {

  userList: any;
  userListSearch: any;
  groupeList: any;
  search: any;
  userItem: any;
  adminProfil: any;

  constructor(
    private noyauService: NoyauService,
    private userManagerEventService: UserManagerEventService
  ) {
    this.userList = [];
    this.userListSearch = [];
    this.groupeList = [];
    this.adminProfil = {};
    this.userItem = {};
    this.search = {};
    this.search.option = '';
   }

  ngOnInit() {
    this.getAllUsers();
    this.handlerUserEmit();
  }

  showUser(user): void {
    this.userItem = {...user};
    for (let x = 0; x < this.groupeList.length; x++) {
      if (this.groupeList[x].users) {
        for (let y = 0; y < this.groupeList[x].users.length; y++) {
          if (this.groupeList[x].users[y] === this.userItem._id) {
           this.userItem.groupe = this.groupeList[x]._id;
          }
        }
      }
    }
    this.annonceUser(this.userItem);
  }

  annonceUser(_user = {}, _action = 'modifier') {
    this.userManagerEventService.announceUser({user: _user, action: _action});
  }

  getAllUsers(): void {
    this.noyauService.getUsers().subscribe( res => {
      if (res.allUser && res.groupe) {
        for (let index = 0; index < res.allUser.length; index++) {
          if (res.allUser[index].role !== 'admin') {
            this.userList.push(res.allUser[index]);
          } else {
            this.adminProfil = res.allUser[index];
          }
          this.userListSearch = this.userList;
        }
        this.groupeList = res.groupe;
      }
    });
  }

  searchChange(input) {
    this.search.field = '';
    this.search.option = input;
    this.userList = this.userListSearch;
  }

  handlerUserEmit() {
    this.userManagerEventService.userConfirmed.subscribe(_user => {
      if (_user) {
        this.userList = [];
        for (let index = 0; index < _user.user.length; index++) {
          if (_user.user[index].role !== 'admin') {
            this.userList.push(_user.user[index]);
          } else {
            this.adminProfil = _user.user;
          }
        }
      }
    });
  }

  searchUser(input) {
    this.userList = [];
    if (input !== '') {
      this.filterTable(this.userListSearch, `${input.toUpperCase()}`);
    } else {
      this.userList = this.userListSearch;
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      for (let index = 0; index < table.length; index++) {
        if (table[index][`${this.search.option}`]._id) {
          if (this.matchString((table[index][`${this.search.option}`].name).toUpperCase(), input)) {
            this.userList.push(table[index]);
          }
        } else {
          if (this.matchString((table[index][`${this.search.option}`]).toUpperCase(), input)) {
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

  addUserModal(): void {
    this.userItem = {};
    this.userItem.rule = [];
    this.annonceUser(this.userItem, 'ajouter');
  }
}
