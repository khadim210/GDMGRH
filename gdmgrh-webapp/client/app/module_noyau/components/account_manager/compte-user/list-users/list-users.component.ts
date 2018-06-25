import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../../service/noyau.service';

@Component({
  selector: 'app-list-users',
  template: require('./list-users.component.html')
})
export class ListUsersComponent implements OnInit {

  static parameters = [NoyauService];

  userList: any;
  userItem: any;
  btnModal: string;

  constructor(
    private noyauService: NoyauService
  ) {
    this.userList = [];
    this.userItem = {};
    this.userItem.rule = [];
    this.btnModal = 'ajouter';
   }

  ngOnInit() {
    this.getAllUsers();
  }

  showUser(user): void {
    this.userItem = {...user};
    this.btnModal = 'modifier';
  }

  getAllUsers(): void {
    this.noyauService.getUsers().subscribe( list => {
      if (list) {
        this.userList = list.response;
      }
    });
  }

  handlerUserEmit(userEmit) {
    this.userList = userEmit.user;
  }

  closeModal(): void {
    this.userItem = {};
    this.userItem.rule = [];
    this.btnModal = 'ajouter';
  }
}
