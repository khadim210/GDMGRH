import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class NoyauService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUsers() {
    return this.http.get<any>(`/user`)
      .pipe(
        catchError(this.authService.handleError('getUsers'))
      );
  }

  createdUsers(user) {
    return this.http.post<any>(`/user/`, user)
      .pipe(
        catchError(this.authService.handleError('getUsers'))
      );
  }

  updateUser(user) {
    return this.http.put<any>(`/user/${user._id}`, user)
      .pipe(
        catchError(this.authService.handleError('updateUser'))
      );
  }

  getDataUserForm() {
    return this.http.get<any>(`/user/data`)
    .pipe(
      catchError(this.authService.handleError('getAtatUserForm'))
    );
  }


  getUsersGroup() {
    return this.http.get<any>(`/groupe/`)
      .pipe(
        catchError(this.authService.handleError('getGroupUser'))
      );
  }

  createdUserGroup(group) {
    return this.http.post<any>(`/groupe/`, group)
      .pipe(
        catchError(this.authService.handleError('createdUserGroup'))
      );
  }

  updateUserGroup(group) {
    return this.http.put<any>(`/groupe/${group._id}`, group)
      .pipe(
        catchError(this.authService.handleError('updateUserGroup'))
      );
  }

  getGroupData() {
    return this.http.get<any>(`/groupe/data`)
      .pipe(
        catchError(this.authService.handleError('getGroupData'))
      );
  }

}
