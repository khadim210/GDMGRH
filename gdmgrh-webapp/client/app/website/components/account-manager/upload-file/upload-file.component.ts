import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { apiUrl } from '../../../../app.constants';
import { AuthService } from '../../../service/auth.service';
import { WebsiteService } from '../../../service/website.service';

@Component({
    selector: 'upload-file',
    template: require('./upload-file.component.html')
})

export class UploadFileComponent implements OnInit {
    @Input() tableUpload;
    @Input() urlCompleted;
    @Output() response = new EventEmitter<any>();
    /*
    uploader: FileUploader = new FileUploader({url: `${apiUrl}/media/upload/file`,
                            itemAlias: 'uploads[]', authToken: 'Bearer ' + this.authService.getUser().token});
    attachmentList: any = [];
    */

    fileSelect: Array<any>;
    selected: any;
    progress: string[];
    nbrItemSave: number;
    disabledInput: boolean;

    constructor(
        private websiteService: WebsiteService
    ) {
        this.fileSelect = [];
        this.progress = [];
        this.nbrItemSave = 0;
        this.disabledInput = false;
        this.tableUpload = [];
        /*
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.attachmentList.push({...JSON.parse(response)});
            console.log(this.attachmentList);
        };
        */
    }

    ngOnInit() { }

    onFileSelect(files) {
        if (files.length) {
            for (let key = 0; key < files.length; key ++) {
                this.fileSelect.push(files[key]);
                this.progress[this.fileSelect.length - 1] = '0%';
            }
        }
    }

    uploadFile(file, i) {
        this.selected = file.lastModified;
        this.websiteService.uploadFile(file, `${this.urlCompleted}`).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress[i] = Math.round(event.loaded / event.total) * 100 + '%';
            } else if (event.type === HttpEventType.Response) {
                this.nbrItemSave = this.nbrItemSave + 1;
                this.emitResponse(event.body);
            }
        });
    }

    emitResponse(response) {
        this.tableUpload.push(response.data[0]._media.name);
        this.response.emit(response.data[0]._media);
    }

    deleteFile(file) {
        this.fileSelect = this.fileSelect.filter(_file => _file.lastModified !== file);
    }

    uploadAllFile() {
        this.nbrItemSave = 0;
        for (let index = 0; index < this.fileSelect.length; index++) {
            this.uploadFile(this.fileSelect[index], index);
        }
        this.fileSelect = [];
        this.nbrItemSave = 0;
        this.disabledInput = false;
    }
}
