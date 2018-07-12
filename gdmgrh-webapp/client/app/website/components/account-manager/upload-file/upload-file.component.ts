import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { apiUrl } from '../../../../app.constants';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'upload-file',
    template: require('./upload-file.component.html')
})

export class UploadFileComponent implements OnInit {

    uploader: FileUploader = new FileUploader({url: `${apiUrl}/media/upload/file`,
                            itemAlias: 'uploads[]', authToken: 'Bearer ' + this.authService.getUser().token});

    attachmentList: any = [];

    constructor(
        private authService: AuthService
    ) {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.attachmentList.push({...JSON.parse(response)});
            console.log(this.attachmentList);
        };
    }

    ngOnInit() { }
}
