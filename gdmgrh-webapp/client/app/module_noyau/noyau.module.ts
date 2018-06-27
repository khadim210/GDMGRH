import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoyauService } from './service/noyau.service';

import { NoyauRoutingModule } from './noyau.routing';

import { NoyauComponent } from './noyau.component';
import { AccountComponent } from './components/account_manager/account.component';
import { CreatedUsersComponent } from './components/account_manager/created-users/created-users.component';
import { CreatGroupComponent } from './components/account_manager/creat-group/creat-group.component';
import { ListUsersComponent } from './components/account_manager/list-users/list-users.component';
import { ListGroupComponent } from './components/account_manager/list-group/list-group.component';
import { SigninComponent } from './components/signin/signin.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { UniteComponent } from './components/unite/unite.component';
import { SanctionComponent } from './components/sanction/sanction.component';
import { SanctionService } from './service/sanction.service';
import { UniteService } from './service/unite.service';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingComponent } from './components/setting/setting.component';

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
        NoyauComponent,
        HeaderComponent
    ],
    declarations: [
        NoyauComponent,
        AccountComponent,
        CreatedUsersComponent,
        CreatGroupComponent,
        ListUsersComponent,
        ListGroupComponent,
        SigninComponent,
        FooterComponent,
        HeaderComponent,
        NavbarComponent,
        SanctionComponent,
        UniteComponent,
        DashboadComponent,
        LogoutComponent,
        SettingComponent
    ],
    providers: [
        NoyauService,
        SanctionService,
        UniteService
    ]
})

export class NoyauModule {

}
