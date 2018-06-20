import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) { }

  getAllGrades(){
  	return this.http.get<any>('http://localhost:3000/grades/getall').pipe();
  }
}
