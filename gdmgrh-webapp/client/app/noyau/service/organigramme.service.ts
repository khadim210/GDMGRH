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

    getOneSousCommandt(commandt) {
      return this.http.post<any>(`/organigramme/sous-command/one/`, commandt)
      .pipe(
        catchError(this.authService.handleError('getOneSousCommandement'))
      );
    }

    getEtatMajor() {
        return this.http.get<any>(`/organigramme/etat-major/all/`)
        .pipe(
          catchError(this.authService.handleError('getEtatMajor'))
        );
    }

    getMobile() {
        return this.http.get<any>(`/organigramme/mobile/all/`)
        .pipe(
          catchError(this.authService.handleError('getMobile'))
        );
      }

      getTerritorial() {
        return this.http.get<any>(`/organigramme/territorial/all/`)
        .pipe(
          catchError(this.authService.handleError('getTerritorial'))
        );
      }
}
