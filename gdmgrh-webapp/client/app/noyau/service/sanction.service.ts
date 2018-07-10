import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../website/service/auth.service';

@Injectable()
export class SanctionService {

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    /**
     * Puniton service
     */

    getPunitions() {
        return this.http.get<any>('/sanction/punition').pipe(
            catchError(this.authService.handleError('getPunition'))
        );
    }

    addPunition(punition) {
        return this.http.post<any>('/sanction/punition', punition).pipe(
            catchError(this.authService.handleError('addPunition'))
        );
    }

    editPunition(punition) {
        return this.http.put<any>('/sanction/punition', punition).pipe(
            catchError(this.authService.handleError('editPunition'))
        );
    }
    deletePunition(_id: Number) {
        return this.http.delete<any>(`/sanction/punition/delete/` + _id).pipe(
            catchError(this.authService.handleError('deletePunition'))
        );
    }

    /**
     * Recompense service
     */

    getRecompenses() {
        return this.http.get<any>('/sanction/recompense').pipe(
            catchError(this.authService.handleError('getRecompense'))
        );
    }

    addRecompense(recompense) {
        return this.http.post<any>('/sanction/recompense', recompense).pipe(
            catchError(this.authService.handleError('addRecompense'))
        );
    }

    editRecompense(recompense) {
        return this.http.put<any>('/sanction/recompense', recompense).pipe(
            catchError(this.authService.handleError('editRecompense'))
        );
    }
    deleteRecompense(_id: Number) {
        return this.http.delete<any>(`/sanction/recompense/delete/` + _id).pipe(
            catchError(this.authService.handleError('deleteRecompense'))
        );
    }
}
