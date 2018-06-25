import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { NoyauService } from '../../../../service/noyau.service';

@Component({
  selector: 'app-created-users',
  template: require('./created-users.component.html')
})
export class CreatedUsersComponent implements OnInit, OnChanges {
  @Input() userForm;
  @Input() action;
  @Output() user = new EventEmitter<any>();
  allRules: any;
  allAgent: any;
  agentName: string;

  constructor(
    private noyauService: NoyauService
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

    this.noyauService.getDataUserForm().subscribe(res => {
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
    this.noyauService.createdUsers(this.userForm).subscribe(res => {
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
    this.noyauService.updateUser(this.userForm).subscribe(res => {
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
