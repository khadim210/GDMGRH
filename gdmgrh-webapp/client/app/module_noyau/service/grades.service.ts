import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { apiUrl } from '../../app.constants';

@Injectable()
export class GradesService {
  private serverUrl = `${apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getAllCat(){
    return this.http.get<any>(`${this.serverUrl}/grades/getallcat`)
      .pipe(
        catchError(this.handleError('getCategories'))
      );
  }

  getAllNiv(){
    return this.http.get<any>(`${this.serverUrl}/grades/getallniv`)
      .pipe(
        catchError(this.handleError('getNiveaux'))
      );
  }

  getAllGrades(){
    return this.http.get<any>(`${this.serverUrl}/grades/getall`)
      .pipe(
        catchError(this.handleError('getGrades'))
      );
  }
  addNewGrade(newgrade){
    return this.http.post<any>(`${this.serverUrl}/grades/add`,newgrade)
      .pipe(
        catchError(this.handleError('addGrades'))
      );
  }

  editGrade(grade,id){
    return this.http.put<any>(`${this.serverUrl}/grades/edit/${id}`,grade)
      .pipe(
        catchError(this.handleError('getGrades'))
      );
  }

  deleteGrade(id){
    return this.http.delete<any>(`${this.serverUrl}/grades/${id}`,id)
      .pipe(
        catchError(this.handleError('getGrades'))
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
