import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../service/accounts.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  groupList: any;
  groupItem: any;
  btnModal: string;

  constructor(
    private accountService: AccountsService
  ) {
    this.groupList = [];
    this.groupItem = {};
    this.btnModal = 'ajouter';
  }

  ngOnInit() {
    this.getGroup();
  }

  showGroup(group) {
    this.groupItem = {...group};
    this.btnModal = 'modifier';
  }

  getGroup() {
    this.accountService.getUsersGroup().subscribe(res => {
      if (res.response) {
        this.groupList = res.response;
      }
    });
  }

  handlerGroupEmit(groupEmit) {
    if (groupEmit.action === 'add') {
      this.groupList.push(groupEmit.group);
    } else {
      this.groupList.forEach(element => {
        if (element._id === groupEmit.group._id) {
          element = groupEmit.group;
        }
      });
    }
  }

  closeModal() {
    this.groupItem = {};
    this.btnModal = 'ajouter';
  }
}
