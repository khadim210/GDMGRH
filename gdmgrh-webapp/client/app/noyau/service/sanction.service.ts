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
        return this.http.get<any>('/noyau/sanction/punition').pipe(
            catchError(this.authService.handleError('getPunition'))
        );
    }

    addPunition(punition) {
        return this.http.post<any>('/noyau/sanction/punition', punition).pipe(
            catchError(this.authService.handleError('addPunition'))
        );
    }

    editPunition(punition) {
        return this.http.put<any>('/noyau/sanction/punition', punition).pipe(
            catchError(this.authService.handleError('editPunition'))
        );
    }
    deletePunition(_id: Number) {
        return this.http.delete<any>(`/noyau/sanction/punition/delete/` + _id).pipe(
            catchError(this.authService.handleError('deletePunition'))
        );
    }

    /**
     * Recompense service
     */

    getRecompenses() {
        return this.http.get<any>('/noyau/sanction/recompense').pipe(
            catchError(this.authService.handleError('getRecompense'))
        );
    }

    addRecompense(recompense) {
        return this.http.post<any>('/noyau/sanction/recompense', recompense).pipe(
            catchError(this.authService.handleError('addRecompense'))
        );
    }

    editRecompense(recompense) {
        return this.http.put<any>('/noyau/sanction/recompense', recompense).pipe(
            catchError(this.authService.handleError('editRecompense'))
        );
    }
    deleteRecompense(_id: Number) {
        return this.http.delete<any>(`/noyau/sanction/recompense/delete/` + _id).pipe(
            catchError(this.authService.handleError('deleteRecompense'))
        );
    }
}
