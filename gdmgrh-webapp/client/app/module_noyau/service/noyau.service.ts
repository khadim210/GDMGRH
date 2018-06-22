import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NoyauService {

    static parameters = [HttpClient];
    constructor(
        private http: HttpClient
    ) {}
}
