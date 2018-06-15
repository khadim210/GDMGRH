import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountsService } from '../../service/accounts.service';

@Component({
  selector: 'app-created-users',
  templateUrl: './created-users.component.html',
  styleUrls: ['./created-users.component.css']
})
export class CreatedUsersComponent implements OnInit {

  @Input() userForm;
  @Input() action;
  @Output() user = new EventEmitter<any>();
  allRules: any;
  allAgent: any;

  constructor(
    private accountsService: AccountsService
  ) {
    this.action = 'ajouter';
    this.userForm = {};
    this.userForm.rule = [];
    this.allAgent = [];
    this.allRules = [];
   }

  ngOnInit() {
    this.getDataForm();
  }

  getDataForm(): void {
    this.allAgent = [{_id: '5b19f17bef483e37c8b0b05c', name: 'Bab'}, {_id: '5b19f32270332246d4f5cc70', name: 'Bib'},
                  {_id: '5b1e5ebdd22dd63f94fd45e5', name: 'Bob'}];
    this.allRules = ['subalterne', 'superieure', 'autoriser'];
    /*
    this.accountsService.getDataUserForm().subscribe(res => {
      if (res.data) {
        const data = res.data;
        this.allAgent = data.agents;
      }
    });
    */
  }

  ruleHandler(check, rule): void {
    console.log(rule);
    if (check) {
      this.addRule(rule);
    } else {
      this.deleteRule(rule);
    }
  }

  addRule(rule): void {
    this.userForm.rule.push(rule);
  }

  deleteRule(rule): void {
    this.userForm.rule = this.userForm.rule.filter(_rule => _rule !== rule);
  }

  addUsers(): void {
    this.accountsService.createdUsers(this.userForm).subscribe(res => {
      if (res.response) {
        this.user.emit({user: res.response, action: 'add'});
        this.userForm = {};
        this.userForm.rule = [];
      }
    });
  }

  updateUsers(): void {
    console.log(this.userForm);
    this.accountsService.updateUser(this.userForm).subscribe(res => {
      if (res.response) {
        this.user.emit({user: res.response, action: 'update'});
      }
    });
  }

}
