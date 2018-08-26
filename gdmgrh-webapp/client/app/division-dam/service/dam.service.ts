import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../website/service/auth.service';

@Injectable()
export class DamService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getAllPromotion(urlCompleted) {
        return this.http.get<any>(`/dam/recrutement/promotion/${urlCompleted}/`)
            .pipe(
                catchError(this.authService.handleError('getAllPromotion'))
            );
    }

    getOnePromotion(nom, urlCompleted) {
        return this.http.get<any>(`/dam/recrutement/promotion/${urlCompleted}/${nom}`)
            .pipe(
                catchError(this.authService.handleError('getOnePromotion'))
            );
    }

    createPromotion(promotion, urlCompleted) {
        return this.http.post<any>(`/dam/recrutement/promotion/${urlCompleted}/`, promotion)
            .pipe(
                catchError(this.authService.handleError('createPromotion'))
            );
    }

    updatePromotion(promotion, id, urlCompleted) {
        return this.http.put<any>(`/dam/recrutement/promotion/${urlCompleted}/${id}`, promotion)
            .pipe(
                catchError(this.authService.handleError('updatePomotion'))
            );
    }

    //
    getAllCandidat(urlCompleted) {
        return this.http.get<any>(`/dam/recrutement/candidat/${urlCompleted}/`)
            .pipe(
                catchError(this.authService.handleError('getAllCandidat'))
            );
    }

    getOneCandidat(urlCompleted, cni) {
        return this.http.get<any>(`/dam/recrutement/candidat/${urlCompleted}/${cni}`)
            .pipe(
                catchError(this.authService.handleError('getOneCandidat'))
            );
    }

    createCandidat(urlCompleted, candidat) {
        return this.http.post<any>(`/dam/recrutement/candidat/${urlCompleted}`, candidat)
            .pipe(
                catchError(this.authService.handleError('createCandidat'))
            );
    }

    updateCandidat(urlCompleted, candidat, id) {
        return this.http.put<any>(`/dam/recrutement/candidat/${urlCompleted}/${id}`, candidat)
            .pipe(
                catchError(this.authService.handleError('updatePomotion'))
            );
    }

    //
    getAllAuxiliaire() {
        return this.http.get<any>(`/dam/recrutement/auxiliaire/all`)
            .pipe(
                catchError(this.authService.handleError('getAllAuxiliaire'))
            );
    }

    getOneAuxiliaire(matricule) {
        return this.http.get<any>(`/dam/recrutement/auxiliaire/one/${matricule}`)
            .pipe(
                catchError(this.authService.handleError('getOneAuxiliaire'))
            );
    }

    createAuxiliaire(auxiliaire) {
        return this.http.post<any>(`/dam/recrutement/auxiliaire/add`, auxiliaire)
            .pipe(
                catchError(this.authService.handleError('createAuxiliaire'))
            );
    }

    updateAuxiliaire(auxiliaire, matricule) {
        return this.http.put<any>(`/dam/recrutement/auxiliaire/update/${matricule}`, auxiliaire)
            .pipe(
                catchError(this.authService.handleError('updatePomotion'))
            );
    }

    // Validation
    getAllValidation() {
        return this.http.get<any>(`/validation/`)
            .pipe(
                catchError(this.authService.handleError('getAllValidation'))
            );
    }

    getOneValidation(id) {
        return this.http.get<any>(`/validation/${id}`)
            .pipe(
                catchError(this.authService.handleError('getOneValidation'))
            );
    }

    updateValidation(validation, id) {
        return this.http.put<any>(`/validation/${id}`, validation)
            .pipe(
                catchError(this.authService.handleError('updateValidation'))
            );
    }
}
