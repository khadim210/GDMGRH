import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoyauComponent } from './noyau.component';
import { AccountComponent } from './components/account_manager/account.component';
import { SigninComponent } from './components/signin/signin.component';
import { ListUsersComponent } from './components/account_manager/list-users/list-users.component';
import { ListGroupComponent } from './components/account_manager/list-group/list-group.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';

const routes: Routes = [
    { path: 'users',
      component: NoyauComponent,
      children: [
        { path: 'dashboad', component: DashboadComponent },
        { path: 'account', component: AccountComponent,
          children: [
            { path: '', redirectTo: '/users/account/user-center', pathMatch: 'full' },
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
        { path: '', redirectTo: '/users/dashboad', pathMatch: 'full' }
      ]
    },
    { path: 'sign-in', component: SigninComponent },
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
