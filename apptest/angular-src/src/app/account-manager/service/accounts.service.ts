import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AccountsService {

  private serverUrl = `http://localhost:3000/`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<any>(`${this.serverUrl}users/`)
      .pipe(
        catchError(this.handleError('getUsers'))
      );
  }

  createdUsers(user) {
    return this.http.post<any>(`${this.serverUrl}users/`, user)
      .pipe(
        catchError(this.handleError('getUsers'))
      );
  }

  updateUser(user) {
    return this.http.put<any>(`${this.serverUrl}users/${user._id}`, user)
      .pipe(
        catchError(this.handleError('updateUser'))
      );
  }

  getDataUserForm() {
    return this.http.get<any>(`${this.serverUrl}users/data`)
    .pipe(
      catchError(this.handleError('getAtatUserForm'))
    );
  }


  getUsersGroup() {
    return this.http.get<any>(`${this.serverUrl}groupe/`)
      .pipe(
        catchError(this.handleError('getGroupUser'))
      );
  }

  createdUserGroup(group) {
    return this.http.post<any>(`${this.serverUrl}groupe/`, group)
      .pipe(
        catchError(this.handleError('createdUserGroup'))
      );
  }

  updateUserGroup(group) {
    return this.http.put<any>(`${this.serverUrl}groupe/${group._id}`, group)
      .pipe(
        catchError(this.handleError('updateUserGroup'))
      );
  }

  getGroupData() {
    return this.http.get<any>(`${this.serverUrl}groupe/data`)
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
