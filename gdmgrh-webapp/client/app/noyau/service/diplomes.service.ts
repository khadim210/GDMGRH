import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DiplomesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllDiplomes() {
    return this.http.get<any>(`/noyau/diplomes/getall`)
      .pipe(
        catchError(this.handleError('getDiplomes'))
      );
  }

  getmiliDiplomes() {
    return this.http.get<any>(`/noyau/diplomes/getallmili`)
      .pipe(
        catchError(this.handleError('getDiplomes'))
      );
  }

  getcivilDiplomes() {
    return this.http.get<any>(`/noyau/diplomes/getallcivil`)
      .pipe(
        catchError(this.handleError('getDiplomes'))
      );
  }

  addNewDiplome(newdiplome) {
    return this.http.post<any>(`/noyau/diplomes/add`, newdiplome)
      .pipe(
        catchError(this.handleError('addDiplomes'))
      );
  }

  editDiplome(diplome, id) {
    return this.http.put<any>(`/noyau/diplomes/edit/${id}`, diplome)
      .pipe(
        catchError(this.handleError('getDiplomes'))
      );
  }

  deleteDiplome(id) {
    return this.http.delete<any>(`/noyau/diplomes/${id}`, id)
      .pipe(
        catchError(this.handleError('getDiplomes'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   *
   */
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

}
