import { Component, OnInit } from '@angular/core';
import { NoyauService } from '../../../service/noyau.service';
import { UserManagerEventService } from '../../../service/user-manager-event.service';

@Component({
  selector: 'app-created-users',
  template: require('./created-users.component.html')
})
export class CreatedUsersComponent implements OnInit {

  userForm: any;
  action: any;
  allRules: any;
  allAgent: any;
  allGroupe: any;
  agentSelected: any;
  errormsg: string;
  searchFound: any;
  searchOption: string;
  searchAgentForm: string;
  updatePassword: boolean;
  hiddenToggle: boolean;

  constructor(
    private noyauService: NoyauService,
    private userManagerEventService: UserManagerEventService
  ) {
    this.action = 'ajouter';
    this.userForm = {};
    this.agentSelected = {};
    this.allAgent = [];
    this.allGroupe = [];
    this.searchFound = [];
    this.searchOption = '';
    this.searchAgentForm = '';
    this.updatePassword = true;
    this.hiddenToggle = true;
   }

  ngOnInit() {
    this.getDataForm();
    this.getItemUserSelected();
  }

  getItemUserSelected() {
    this.userManagerEventService.userAnnounced.subscribe(_user => {
      this.errormsg = '';
      this.searchFound = [];
      if (_user.action && _user.user) {
        this.action = _user.action;
        this.agentSelected = {};
        var user = {..._user.user};
        this.allAgent = this.allAgent.filter(agent => agent.access !== true);
        if (_user.action === 'modifier') {
          var idAgent = user.agent._id;
          this.allAgent.push(user.agent);
          this.agentSelected = {name: user.agent.name, unite: user.agent.unite};
          user.agent = idAgent;
          this.userForm = user;
          this.updatePassword = false;
          this.hiddenToggle = false;
        } else {
          this.userForm = user;
          this.updatePassword = true;
          this.hiddenToggle = true;
        }
      }
    });
  }

  getDataForm(): void {
    this.noyauService.getDataUserForm().subscribe(res => {
      if (res) {
        this.allAgent = res.agent;
        this.allGroupe = res.groupe;
      }
    });

  }

  addUsers(): void {
    this.noyauService.createdUsers(this.userForm).subscribe(res => {
      if (res.user && res.agent) {
        this.userManagerEventService.confirmUser({user: res.user});
        this.errormsg = '';
        this.searchAgentForm = '';
        this.searchFound = [];
        this.userForm = {};
        this.allAgent = res.agent;
        this.agentSelected = {};
      } else if (res.error) {
        this.errormsg = res.error;
      }
    });
  }

  updateUsers(): void {
    this.noyauService.updateUser(this.userForm).subscribe(res => {
      if (res.user && res.agent) {
        this.userManagerEventService.confirmUser({user: res.user});
        this.allAgent = res.agent;
      } else if (res.error) {
        this.errormsg = res.error;
      }
    });
  }

  deleteAgentName() {
    this.agentSelected = {};
    this.searchAgentForm = '';
    this.searchFound = [];
  }

  optionSelected(option = '') {
    this.searchOption = option;
  }

  selectAgent(agent) {
    this.agentSelected = agent;
    this.userForm.agent = agent._id;
  }

  searchAgent(input = '') {
    var _allAgent = this.allAgent;
    this.searchFound = [];
    input = input.toUpperCase();
    this.filterTable(_allAgent, `${input}`);
    if (input === '') {
      this.searchFound = [];
    }
  }

  filterTable(table = [], input) {
    if (table.length) {
      if (this.searchOption) {
        for (let index = 0; index < table.length; index++) {
          if (this.matchString((table[index][`${this.searchOption}`]).toUpperCase(), input)) {
            this.searchFound.push(table[index]);
          }
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

  updatePasswordHandler() {
    this.updatePassword = !this.updatePassword;
  }
}
