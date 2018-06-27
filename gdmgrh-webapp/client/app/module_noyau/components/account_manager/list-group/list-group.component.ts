import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';

@Component({
  selector: 'app-list-group',
  template: require('./list-group.component.html')
})
export class ListGroupComponent implements OnInit {

  groupList: any;
  groupItem: any;
  btnModal: string;

  constructor(
    private noyauService: NoyauService
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
    this.noyauService.getUsersGroup().subscribe(res => {
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
