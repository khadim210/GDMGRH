import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common/';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'ng2-imageupload';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
import { PictureProfileComponent } from './components/account-manager/picture-profile/picture-profile.component';
import { WebsiteService } from './service/website.service';
import { UploadFileComponent } from './components/account-manager/upload-file/upload-file.component';
import { ArchiveDocumentComponent } from './components/archive-document/archive-document.component';
import { NotificationService } from './service/notification.service';
import { PdfViewsComponent } from './components/pdf-views/pdf-views.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        WebsiteRoutingModule,
        ImageUploadModule,
        FileUploadModule,
        PdfViewerModule
    ],
    exports: [
        CommonModule,
        NotFoundComponent,
        HeaderComponent,
        FooterComponent,
        PictureProfileComponent,
        UploadFileComponent,
        ArchiveDocumentComponent,
        PdfViewsComponent
    ],
    declarations: [
        NotFoundComponent,
        AccountManagerComponent,
        SignInComponent,
        LogOutComponent,
        SettingComponent,
        HeaderComponent,
        NavbarComponent,
        FooterComponent,
        PictureProfileComponent,
        UploadFileComponent,
        ArchiveDocumentComponent,
        PdfViewsComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        WebsiteService,
        NotificationService
    ]
})

export class WebsiteModule {

}
