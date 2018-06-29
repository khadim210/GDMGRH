import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';

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
  errormsg: string;
  agentSearch: any;
  searchOption: string;

  constructor(
    private noyauService: NoyauService
  ) {
    this.action = 'ajouter';
    this.userForm = {};
    //this.userForm.role = [];
    this.allAgent = [];
    this.allRules = [];
    this.agentSearch = [];
    this.searchOption = '';
   }

   ngOnChanges(change: SimpleChanges) {
    this.agentName = '';
    if (change.userForm.currentValue.agent) {
      this.allAgent = this.allAgent.filter(agent => agent.access !== true);
      this.allAgent.push(change.userForm.currentValue.agent);
      this.agentName = change.userForm.currentValue.agent.name;
      this.userForm.agent = change.userForm.currentValue.agent._id;
    }
   }
  ngOnInit() {
    this.getDataForm();
  }

  getDataForm(): void {
    this.allRules = ['chef', 'chef_secretaire', 'secretaire'];

    this.noyauService.getDataUserForm().subscribe(res => {
      if (res.response) {
        const data = res.response;
        this.allAgent = data;
      }
    });

  }

  showAgent(_agentName): void {
    if (_agentName) {
      for (let index = 0; index < this.allAgent.length; index++) {
        if (_agentName === this.allAgent[index]._id) {
          this.agentName = this.allAgent[index].name;
        }
      }
    }
  }

  addUsers(): void {
    console.log(this.userForm);
    this.noyauService.createdUsers(this.userForm).subscribe(res => {
      console.log(res);
      if (res.user && res.agent) {
        const user = res;
        this.user.emit({user: user.user});
        this.userForm = {};
        //this.userForm.role = [];
        this.allAgent = user.agent;
        this.agentName = '';
      } else if (res.error) {
        this.errormsg = res.error;
      }
    });
  }

  updateUsers(): void {
    this.noyauService.updateUser(this.userForm).subscribe(res => {
      if (res.user && res.agent) {
        this.user.emit({user: res.user});
        this.userForm = {};
        //this.userForm.role = [];
        this.allAgent = res.agent;
        this.agentName = '';
        this.action = 'ajouter';
      } else if (res.error) {
        this.errormsg = res.error;
      }
    });
  }

  selectAgent(agent) {
    console.log(agent);
    this.agentName = agent;
    this.userForm.agent = agent._id;
    console.log(this.userForm.agent);
  }

  searchRole(input, option) {
    this.searchOption = option;
    this.agentSearch = [];
    this.filterTable(this.allAgent, `${input}`);
    console.log(this.agentSearch);
    if (input === '') {
      this.agentSearch = [];
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      for (let index = 0; index < table.length; index++) {
        if (this.matchString(table[index][`${this.searchOption}`], input)) {
          this.agentSearch.push(table[index]);
        }
      }
    }
  }

  matchString(string1, string2) {
      if (RegExp(string2).test(string1.toString())) {
        return true;
      }
    return false;
  }
}
