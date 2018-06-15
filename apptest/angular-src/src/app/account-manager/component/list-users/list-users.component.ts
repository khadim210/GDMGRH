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
    console.log(user);
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
    if (userEmit.action === 'add') {
      this.userList.push(userEmit.user);
    } else {
      for (let index = 0; index < this.userList.length; index++) {
        if (this.userList[index]._id === userEmit.user._id) {
          this.userList[index] = userEmit.user;
          break;
        }
      }
    }
  }

  closeModal(): void {
    this.userItem = {};
    this.userItem.rule = [];
    this.btnModal = 'ajouter';
  }
}
