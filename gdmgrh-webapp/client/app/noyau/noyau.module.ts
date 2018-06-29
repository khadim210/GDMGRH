import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoyauService } from './service/noyau.service';
import { AuthService } from './service/auth.service';
import { SanctionService } from './service/sanction.service';
import { UniteService } from './service/unite.service';

import { NoyauRoutingModule } from './noyau.routing';

import { NoyauComponent } from './noyau.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { CreatedUsersComponent } from './components/user-manager/created-users/created-users.component';
import { CreatGroupComponent } from './components/user-manager/creat-group/creat-group.component';
import { ListUsersComponent } from './components/user-manager/list-users/list-users.component';
import { ListGroupComponent } from './components/user-manager/list-group/list-group.component';
import { AccountManagerComponent } from './components/account-manager/account-manager.component';
import { SigninComponent } from './components/account-manager/signin/signin.component';
import { LogoutComponent } from './components/account-manager/logout/logout.component';
import { SettingComponent } from './components/account-manager/setting/setting.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { AuthGuard } from './auth.guard';
import { NoyauGuard } from './noyau.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NoyauRoutingModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        HeaderComponent,
        NavbarComponent
    ],
    declarations: [
        NoyauComponent,
        UserManagerComponent,
        CreatedUsersComponent,
        CreatGroupComponent,
        ListUsersComponent,
        ListGroupComponent,
        AccountManagerComponent,
        SigninComponent,
        LogoutComponent,
        SettingComponent,
        FooterComponent,
        HeaderComponent,
        NavbarComponent,
        SanctionComponent,
        UniteComponent,
        DashboadComponent
    ],
    providers: [
        NoyauService,
        AuthService,
        SanctionService,
        UniteService,
        AuthGuard,
        NoyauGuard
    ]
})

export class NoyauModule {

}
