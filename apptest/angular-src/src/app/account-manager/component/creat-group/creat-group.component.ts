import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountsService } from '../../service/accounts.service';

@Component({
  selector: 'app-creat-group',
  templateUrl: './creat-group.component.html',
  styleUrls: ['./creat-group.component.css']
})
export class CreatGroupComponent implements OnInit {

  @Input() action;
  @Input() groupForm: any;
  @Output() group = new EventEmitter<any>();
  userList: any;
  uniteList: any;
  constructor(
    private accountService: AccountsService
  ) {
    this.groupForm = {};
    this.userList = [];
    this.uniteList = [];
   }

  ngOnInit() {
    this.getGroupData();
  }

  getGroupData() {
    this.uniteList = [{_id: '5b19f17bef483e37c8b0b05c', name: 'DAM'}, {_id: '5b19f32270332246d4f5cc70', name: 'DGP'},
                  {_id: '5b1e5ebdd22dd63f94fd45e5', name: 'DCC'}];
    this.accountService.getGroupData().subscribe(res => {
      if (res.response) {
        this.userList = res.response;
      }
    });
  }

  addGroup() {
    this.accountService.createdUserGroup(this.groupForm).subscribe(res => {
      if (res.response) {
        this.group.emit({group: res.response, action: 'add'});
      }
    });
  }

  updateGroup() {
    this.accountService.updateUserGroup(this.groupForm).subscribe(res => {
      if (res.response) {
        this.group.emit({group: res.response, action: 'update'});
      }
    });
  }

}
