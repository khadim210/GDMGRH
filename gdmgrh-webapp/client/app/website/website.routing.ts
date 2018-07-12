import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagerComponent } from './components/account-manager/account-manager.component';
import { AuthGuard } from './auth.guard';
import { SignInComponent } from './components/account-manager/sign-in/sign-in.component';
import { SettingComponent } from './components/account-manager/setting/setting.component';

const routes: Routes = [
    { path: 'account',
      component: AccountManagerComponent,
      //canActivate: [AuthGuard],
      children: [
        { path: 'sign-in', component: SignInComponent },
        { path: 'setting', component: SettingComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule { }
