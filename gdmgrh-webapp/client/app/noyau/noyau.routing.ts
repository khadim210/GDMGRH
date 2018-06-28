import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoyauComponent } from './noyau.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { AccountManagerComponent } from './components/account-manager/account-manager.component';
import { SigninComponent } from './components/account-manager/signin/signin.component';
import { SettingComponent } from './components/account-manager/setting/setting.component';
import { ListUsersComponent } from './components/user-manager/list-users/list-users.component';
import { ListGroupComponent } from './components/user-manager/list-group/list-group.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { AuthGuard } from './auth.guard';
import { NoyauGuard } from './noyau.guard';

const routes: Routes = [
  { path: 'account',
    component: AccountManagerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'sign-in', component: SigninComponent },
      { path: 'setting', component: SettingComponent }
    ]
  },
  { path: 'noyau',
    component: NoyauComponent,
    canActivate: [NoyauGuard],
    children: [
      { path: 'dashboad', component: DashboadComponent },
      { path: 'users', component: UserManagerComponent,
        canActivateChild: [NoyauGuard],
        children: [
          { path: '', redirectTo: '/noyau/users/user-center', pathMatch: 'full' },
          { path: 'user-center', component: ListUsersComponent },
          { path: 'group', component: ListGroupComponent }
        ]
      },
      { path: 'sanction', component: SanctionComponent,
        children: []
      },
      { path: 'unite', component: UniteComponent,
        children: []
      },
      { path: '', redirectTo: '/noyau/dashboad', pathMatch: 'full' }
    ]
  },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class NoyauRoutingModule {

}
