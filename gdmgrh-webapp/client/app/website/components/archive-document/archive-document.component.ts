import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { WebsiteService } from '../../service/website.service';

@Component({
    selector: 'archive-document',
    template: require('./archive-document.component.html')
})

export class ArchiveDocumentComponent implements OnInit {

    archive: any;
    msgErrorFrom: string;
    urlCompleted: string;
    tableUpload: string[];
    archiveList: any;
    showPCreateArchive: string;
    showPListArchive: string;

    constructor(
        private authService: AuthService,
        private websiteService: WebsiteService
    ) {
        this.archive = {};
        this.msgErrorFrom = '';
        this.urlCompleted = '';
        this.tableUpload = [];
        this.archiveList = [];
        this.showPCreateArchive = '+';
        this.showPListArchive = '+';
    }

    ngOnInit() {
        this.getArchive();
    }

    getArchive() {
        if (this.authService.getUser().role) {
            this.urlCompleted = `/${this.authService.getUser().role}`;
            this.archive.module = this.authService.getUser().group;
            this.websiteService.getArchive(this.archive.module).subscribe(res => {
                if (res.archives) {
                    console.log(res.archives)
                    this.archiveList = res.archives;
                } else if (422 === res.status) {
                    this.msgErrorFrom = res.error.message;
                }
            });
        }
    }

    createArchive() {
        console.log(this.archive);
        this.websiteService.createArchive({archive: this.archive}).subscribe(res => {
            if (res.storeResponse) {
                console.log(res.storeResponse);
            } else if (422 === res.status) {
                this.msgErrorFrom = res.error.message;
            }
        });
    }

    onResponseFileEmit(fileName) {
        this.archive.fichierJoint = fileName._id;
    }

    showPanel(name) {
        if (name === 'createArchive') {
            this.showPCreateArchive === '+' ? this.showPCreateArchive = '-' : this.showPCreateArchive = '+';
        } else if (name === 'listArchive') {
            this.showPListArchive === '+' ? this.showPListArchive = '-' : this.showPListArchive = '+';
        }
    }
}
