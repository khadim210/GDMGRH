import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageName, apiUrl } from '../../app.constants';

@Injectable()
export class AuthService {

    private serverUrl = `${apiUrl}`;
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
        return this.http.post<any>(`${apiUrl}/user/signin`, user).pipe();
    }
}
