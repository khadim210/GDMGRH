import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common/';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/404/404.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './auth.guard';
import { WebsiteRoutingModule } from './website.routing';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AccountManagerComponent } from './components/account-manager/account-manager.component';
import { LogOutComponent } from './components/account-manager/log-out/log-out.component';
import { SignInComponent } from './components/account-manager/sign-in/sign-in.component';
import { SettingComponent } from './components/account-manager/setting/setting.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        WebsiteRoutingModule
    ],
    exports: [
        CommonModule,
        NotFoundComponent,
        HeaderComponent,
        FooterComponent
    ],
    declarations: [
        NotFoundComponent,
        AccountManagerComponent,
        SignInComponent,
        LogOutComponent,
        SettingComponent,
        HeaderComponent,
        NavbarComponent,
        FooterComponent

    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})

export class WebsiteModule {

}
