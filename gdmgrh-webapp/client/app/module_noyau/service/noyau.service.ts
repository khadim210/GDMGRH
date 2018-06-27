import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { apiUrl } from '../../app.constants';

@Injectable()
export class NoyauService {
  private serverUrl = `${apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<any>(`${this.serverUrl}/user`)
      .pipe(
        catchError(this.handleError('getUsers'))
      );
  }

  createdUsers(user) {
    return this.http.post<any>(`${this.serverUrl}/user/`, user)
      .pipe(
        catchError(this.handleError('getUsers'))
      );
  }

  updateUser(user) {
    return this.http.put<any>(`${this.serverUrl}/user/${user._id}`, user)
      .pipe(
        catchError(this.handleError('updateUser'))
      );
  }

  getDataUserForm() {
    return this.http.get<any>(`${this.serverUrl}/user/data`)
    .pipe(
      catchError(this.handleError('getAtatUserForm'))
    );
  }


  getUsersGroup() {
    return this.http.get<any>(`${this.serverUrl}/groupe/`)
      .pipe(
        catchError(this.handleError('getGroupUser'))
      );
  }

  createdUserGroup(group) {
    return this.http.post<any>(`${this.serverUrl}/groupe/`, group)
      .pipe(
        catchError(this.handleError('createdUserGroup'))
      );
  }

  updateUserGroup(group) {
    return this.http.put<any>(`${this.serverUrl}/groupe/${group._id}`, group)
      .pipe(
        catchError(this.handleError('updateUserGroup'))
      );
  }

  getGroupData() {
    return this.http.get<any>(`${this.serverUrl}/groupe/data`)
      .pipe(
        catchError(this.handleError('getGroupData'))
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
