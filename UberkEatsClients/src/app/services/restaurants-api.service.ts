import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError,throwError, subscribeOn } from 'rxjs';
import { Observable } from 'rxjs';
import { Articles } from '../model/articles';
import { Order, OrdersObject } from '../model/order';
import { Menus } from '../model/menus';
import { Axios } from 'axios';

@Injectable({
	providedIn: 'root'
})
export class RestaurantsApiService {
	// Controller url
	controllerUrl = 'http://localhost:9000';
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
	createArticle(article: Articles): Observable<HttpResponse<Articles>> {
		return this.http.post<Articles>(
			this.controllerUrl + '/articles',
			JSON.stringify(article),
			{...this.httpOptions, observe: 'response'},
		).pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API post() method => createMenu
	createMenu(menu: Menus): Observable<HttpResponse<Menus>> {
		return this.http.post<Menus>(
			this.controllerUrl + '/menus',
			JSON.stringify(menu),
			{...this.httpOptions, observe: 'response'},
		).pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API post() method => getOrders
	getOrdersToBePicked(): Observable<Order[]> {
		return this.http.get<Order[]>(
			this.controllerUrl + '/orders/freeorders',
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
