import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clients } from '../model/clients';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Restaurants } from '../model/restaurants';
import { Articles } from '../model/articles';
import { Menus } from '../model/menus';
import { AuthToken } from '../model/authToken';
@Injectable({
	providedIn: 'root',
})
export class ClientsApiService {
	// Define API
	apiURL = 'http://localhost:8080';
	//apiURL = 'https://localhost:44310';
	apiNoSQLURL = '';
	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JWT')
		}),
	};

	constructor(private http: HttpClient) { }
	/*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/


	// HttpClient API post() method => Authenticate
	authenticate(employee: any): Observable<AuthToken> {
		return this.http.post<AuthToken>(
			this.apiURL + '/authenticate',
			JSON.stringify(employee),
			this.httpOptions
		)
			.pipe(retry(1), catchError(this.handleError));
	}

	register(employee: any, roleName: any, affiliateMail: any): Observable<AuthToken> {
		console.log(affiliateMail);
		return this.http.post<AuthToken>(
			this.apiURL + '/create',
			JSON.stringify({ user: employee, roleName, affiliateMail }),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	getRestaurants(): Observable<Restaurants> {
		return this.http.get<Restaurants>(
			this.apiNoSQLURL + '/restaurants',
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	FetchArticleData(id: number): Observable<Articles> {
		return this.http.get<Articles>(
			this.apiNoSQLURL + '/article/' + id,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	FetchMenuData(id: number): Observable<Menus> {
		return this.http.get<Menus>(
			this.apiNoSQLURL + '/menus/' + id,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	// Error handling
	handleError(error: any) {
		console.log(error);
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
		}
		window.alert(errorMessage);
		return throwError(() => errorMessage);
	}
}

