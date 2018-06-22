import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NoyauService } from './service/noyau.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        NoyauService
    ]
})

export class NoyauModule {

}
