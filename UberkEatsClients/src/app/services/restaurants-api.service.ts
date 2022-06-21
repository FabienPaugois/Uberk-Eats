import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError,throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Articles } from '../model/articles';
import { OrdersObject } from '../model/order';

@Injectable({
	providedIn: 'root'
})
export class RestaurantsApiService {
	// Define API
	apiURL = 'https://localhost:44310';
	apiNoSQLURL = '';
	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	constructor(private http: HttpClient) { }
	/*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

	// HttpClient API post() method => createArticle
	createArticle(article: Articles): Observable<Articles> {
		return this.http.post<Articles>(
			this.apiURL + '/articles',
			JSON.stringify(article),
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API post() method => getOrders
	getOrders(): Observable<OrdersObject> {
		return this.http.get<OrdersObject>(
			this.apiNoSQLURL + '/orders',
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	// Error handling
	handleError(error: any) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		window.alert(errorMessage);
		return throwError(() => errorMessage);
	}
}
