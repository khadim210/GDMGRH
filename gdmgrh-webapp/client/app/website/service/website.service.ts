import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class WebsiteService {


    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    uploadPicture(file, src) {
        var formData = new FormData();
        formData.append('uploads[]', file, file[' name ']);
        formData.append('description', 'photo profile');
        formData.append('urlResized', src);
        formData.append('categorie', 'image');
        return this.http.post(`/media/upload/picture`, formData)
            .pipe(
                catchError(this.authService.handleError('media'))
            );
    }
}
