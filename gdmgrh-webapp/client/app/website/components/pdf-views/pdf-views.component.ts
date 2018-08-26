import { Component, OnInit, Input } from '@angular/core';
import { apiUrl } from '../../../app.constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'selector-pdf-views',
    template: require('./pdf-views.component.html')
})

export class PdfViewsComponent implements OnInit {

    @Input() pdfurl: any;
    page: number;
    totalPages: number;
    isLoaded: boolean;

    constructor(
        private sanitizer: DomSanitizer
    ) {
        this.page = 1;
        this.isLoaded = false;
        this.pdfurl = 'http://localhost:9000/uploads/upload[]-1531767130180.pdf';
    }

    ngOnInit() { }

    afterLoadComplete(pdfData: any) {
        this.totalPages = pdfData.numPages;
        this.isLoaded = true;
    }

    nextPage() {
        this.page++;
    }

    prevPage() {
        this.page--;
    }
}
