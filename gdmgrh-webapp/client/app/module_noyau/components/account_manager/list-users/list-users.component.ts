import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';

@Component({
  selector: 'app-list-users',
  template: require('./list-users.component.html')
})
export class ListUsersComponent implements OnInit {

  userList: any;
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

  closeModal(): void {
    this.userItem = {};
    this.userItem.rule = [];
    this.btnModal = 'ajouter';
  }
}
