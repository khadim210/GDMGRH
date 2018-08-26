import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class WebsiteService {


    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    uploadPicture(file, src, urlCompleted) {
        console.log(file);
        var formData = new FormData();
        var categorie = {type: 'image'};
        formData.append('upload[]', file, file[' name ']);
        formData.append('description', 'photo profile');
        formData.append('urlResized', src);
        formData.append('categorie', categorie.type);
        return this.http.post(`/media/${urlCompleted}/upload/picture`, formData, {
            reportProgress: true,
            observe: 'events',
            responseType: 'json'
        });
    }

    uploadFile(file, urlCompleted) {
        var formData = new FormData();
        var categorie = {type: 'file'};
        formData.append('upload[]', file, file.name);
        formData.append('description', 'fichier joint');
        formData.append('categorie', categorie.type);
        return this.http.post(`/media/${urlCompleted}/upload/file`, formData, {
            reportProgress: true,
            observe: 'events',
            responseType: 'json'
        });
    }

    createArchive(archive) {
        return this.http.post<any>('/archive', archive)
                .pipe(
                    catchError(this.authService.handleError('CreateArchive'))
                );
    }

    getArchive(module) {
        return this.http.get<any>(`/archive/${module}`)
                .pipe(
                    catchError(this.authService.handleError('GetArchive'))
                );
    }
}
