import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AccountsService } from '../../service/accounts.service';
import { checkAndUpdatePureExpressionInline } from '@angular/core/src/view/pure_expression';

@Component({
  selector: 'app-created-users',
  templateUrl: './created-users.component.html',
  styleUrls: ['./created-users.component.css']
})
export class CreatedUsersComponent implements OnInit, OnChanges {

  @Input() userForm;
  @Input() action;
  @Output() user = new EventEmitter<any>();
  allRules: any;
  allAgent: any;
  agentName: string;

  constructor(
    private accountsService: AccountsService
  ) {
    this.action = 'ajouter';
    this.userForm = {};
    this.userForm.rule = [];
    this.allAgent = [];
    this.allRules = [];
   }

   ngOnChanges(change: SimpleChanges) {
    this.agentName = '';
    if (change.userForm.currentValue.agent) {
      this.allAgent = this.allAgent.filter(agent => agent.access !== true);
      this.allAgent.push(change.userForm.currentValue.agent);
      this.agentName = change.userForm.currentValue.agent.name;
    }
   }
  ngOnInit() {
    this.getDataForm();
  }

  getDataForm(): void {
    this.allRules = ['subalterne', 'superieure', 'autoriser'];

    this.accountsService.getDataUserForm().subscribe(res => {
      if (res.response) {
        const data = res.response;
        this.allAgent = data;
      }
    });

  }

  showAgent(_agentName): void {
    console.log(_agentName);
    if (_agentName) {
      for (let index = 0; index < this.allAgent.length; index++) {
        if (_agentName === this.allAgent[index]._id) {
          this.agentName = this.allAgent[index].name;
        }
      }
    }
  }

  addUsers(): void {
    this.accountsService.createdUsers(this.userForm).subscribe(res => {
      if (res) {
        const user = res;
        this.user.emit({user: user.user});
        this.userForm = {};
        this.userForm.rule = [];
        this.allAgent = user.agent;
        this.agentName = '';
      }
    });
  }

  updateUsers(): void {
    this.accountsService.updateUser(this.userForm).subscribe(res => {
      if (res) {
        const user = res;
        this.user.emit({user: user.user});
        this.userForm = {};
        this.userForm.rule = [];
        this.allAgent = user.agent;
        this.agentName = '';
        this.action = 'ajouter';
        console.log(res);
      }
    });
  }

}
