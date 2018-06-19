import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../service/accounts.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userList: any;
  userItem: any;
  btnModal: string;

  constructor(
    private accountsService: AccountsService
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
    this.accountsService.getUsers().subscribe( list => {
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
