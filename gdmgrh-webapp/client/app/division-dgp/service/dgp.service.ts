import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DgpService {

	constructor(private http: HttpClient) { }

/*
	getAllDiplomes(){
		return this.http.get<any>(`diplomes/getall`)
		.pipe(
			catchError(this.handleError('getDiplomes'))
			);
	}

	getmiliDiplomes(){
		return this.http.get<any>(`/diplomes/getallmili`)
		.pipe(
			catchError(this.handleError('getDiplomes'))
			);
	}*/

	getcivilDiplomes(){
		return this.http.get<any>(`/noyau/diplomes/getallcivil`)
		.pipe(
			catchError(this.handleError('getDiplomes'))
			);
	}

	addGendarme(gendarme){
		return this.http.post<any>(`/agents/add`,gendarme)
		.pipe(
			catchError(this.handleError('addGendarme'))
			);
	}

	updateGendarme(id,gendarme){
		return this.http.post<any>(`/agents/`+id,gendarme)
		.pipe(
			catchError(this.handleError('updateGendarme'))
			);
	}

	getAgents(){
		return this.http.get<any>(`/agents/getall`)
		.pipe(
			catchError(this.handleError('getAgent'))
			);
	}

	getOneAgent(id){
		return this.http.get<any>(`/agents/getone/`+id)
		.pipe(
			catchError(this.handleError('getOneAgent'))
			);
	}

	private handleError<T>(operation = 'operation') {
		return (error: any): Observable<T> => {
			return of(error as T);
		};
	}
}
