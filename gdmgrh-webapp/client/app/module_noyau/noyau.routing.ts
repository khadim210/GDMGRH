import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoyauComponent } from './noyau.component';
import { CompteUserComponent } from './components/account_manager/compte-user/compte-user.component';
import { SigninComponent } from './components/account_manager/signin/signin.component';
import { ListUsersComponent } from './components/account_manager/compte-user/list-users/list-users.component';
import { ListGroupComponent } from './components/account_manager/compte-user/list-group/list-group.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';

const routes: Routes = [
    { path: 'users',
      component: NoyauComponent,
      children: [
        { path: 'signin', component: SigninComponent },
        { path: 'account', component: CompteUserComponent,
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
        { path: '', redirectTo: '/users/signin', pathMatch: 'full' }
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
