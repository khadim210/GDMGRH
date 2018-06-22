import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreatedUsersComponent } from './account-manager/component/created-users/created-users.component';
import { AccountsService } from './account-manager/service/accounts.service';
import { ListUsersComponent } from './account-manager/component/list-users/list-users.component';
import { CompteUserComponent } from './account-manager/component/compte-user/compte-user.component';
import { ListGroupComponent } from './account-manager/component/list-group/list-group.component';
import { CreatGroupComponent } from './account-manager/component/creat-group/creat-group.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatedUsersComponent,
    ListUsersComponent,
    CompteUserComponent,
    ListGroupComponent,
    CreatGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AccountsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
