import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../website/service/auth.service';

@Injectable()
export class OrganigrammeService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getOneSousCommandt(typeSousCmdt) {
      return this.http.get<any>(`/noyau/organigramme/sous-command/${typeSousCmdt}`)
      .pipe(
        catchError(this.authService.handleError('getOneSousCommandement'))
      );
    }

    updateSousCommandt(command) {
      return this.http.put<any>(`/noyau/organigramme/sous-command/${command._id}`, command)
      .pipe(
        catchError(this.authService.handleError('updateSousCommandement'))
      );
    }

    getEtatMajor() {
        return this.http.get<any>(`/noyau/organigramme/etat-major/all/`)
        .pipe(
          catchError(this.authService.handleError('getEtatMajor'))
        );
    }

    getMobile() {
        return this.http.get<any>(`/noyau/organigramme/mobile/all/`)
        .pipe(
          catchError(this.authService.handleError('getMobile'))
        );
      }

      getTerritorial() {
        return this.http.get<any>(`/noyau/organigramme/territorial/all/`)
        .pipe(
          catchError(this.authService.handleError('getTerritorial'))
        );
      }
}
