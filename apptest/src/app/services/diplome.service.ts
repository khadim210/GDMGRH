import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  constructor(private http : HttpClient) { }

  getAllDiplomes(){
  	//return this.http.get('http://localhost:3000/diplomes/getall');
  	return this.http.get<any>('http://localhost:3000/diplomes/getall').pipe();
  	//return this.http.get('http://localhost:3000/diplome').pipe(map(res => res.json()));
  }

  addNewDiplome(newdiplome){
  	return this.http.post<any>('http://localhost:3000/diplomes/add',newdiplome).pipe();
  }

  editDiplome(diplome,id){
  	return this.http.put<any>('http://localhost:3000/diplomes/edit/'+id,diplome).pipe();
  }

  deleteDiplome(id){
  	return this.http.delete<any>('http://localhost:3000/diplomes/'+id,id).pipe();
  }


  /*private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }*/

}
