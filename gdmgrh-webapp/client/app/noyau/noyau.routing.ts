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
import { DiplomesComponent } from './components/diplomes/diplomes.component';
import { GradesComponent } from './components/grades/grades.component';
import { AuthGuard } from './auth.guard';
import { NoyauGuard } from './noyau.guard';
import { PunitionComponent } from './components/sanction/punition/punition.component';
import { RecompenseComponent } from './components/sanction/recompense/recompense.component';

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
          { path: 'user-center', component: ListUsersComponent },
          { path: 'group', component: ListGroupComponent },
          { path: '', redirectTo: '/noyau/users/user-center', pathMatch: 'full' }
        ]
      },
      { path: 'sanction', component: SanctionComponent,
        canActivateChild: [NoyauGuard],
        children: [
          { path: 'punition', component: PunitionComponent },
          { path: 'recompense', component: RecompenseComponent },
          { path: '', redirectTo: '/noyau/sanction/punition', pathMatch: 'full' }
        ]
      },
      { path: 'unite', component: UniteComponent,
        children: []
      },
      { path: 'diplomes', component: DiplomesComponent,
        children: []
      },
      { path: 'grades', component: GradesComponent,
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
