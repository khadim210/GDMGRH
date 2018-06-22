import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NoyauModule } from './module_noyau/noyau.module';

@NgModule({
    providers: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        NoyauModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
