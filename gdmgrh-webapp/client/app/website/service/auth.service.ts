import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { localStorageName } from '../../app.constants';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Save user in local starage
     */
    save (user) {
        localStorage.setItem(localStorageName, JSON.stringify(user));
    }

    /**
     * check user is connected
     */
    isConnected() {
        return localStorage.getItem(localStorageName) !== null;
    }

    /**
     * get user connected
     */
    getUser() {
        if (this.isConnected) {
            return JSON.parse(localStorage.getItem(localStorageName));
        }
        return null;
    }

    /**
     * logout User
     */
    logout() {
        localStorage.clear();
    }

    /**
     * Sign-in User
     */
    signin(user) {
        return this.http.post<any>(`/user/signin`, user)
          .pipe(
            catchError(this.handleError('signin'))
          );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   *
   */
    handleError<T>(operation = 'operation') {
        return (error: any): Observable<T> => {
            return of(error as T);
        };
  }
}
