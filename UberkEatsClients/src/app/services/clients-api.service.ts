import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Restaurants } from '../model/restaurants';
import { Articles } from '../model/articles';
import { Menus } from '../model/menus';
import { AuthToken } from '../model/authToken';
import { ConnectionLogs } from '../model/connectionLogs';
import { Order, OrdersObject } from '../model/order';
import { Clients } from 'app/model/clients';
import { Md5 } from 'ts-md5';
@Injectable({
	providedIn: 'root',
})
export class ClientsApiService {
  	// Controller url
  	controllerUrl = 'http://localhost:9000';
	// Define API
	apiURL = 'http://localhost:8080';
	//apiURL = 'https://localhost:44310';
	apiNoSQLURL = 'http://localhost:9000';
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


	public get userAuth(): AuthToken {
		return {
			user: JSON.parse(localStorage.getItem('User') as string),
			jwtoken: localStorage.getItem('JWT') as string
		} as AuthToken;
	}

	// HttpClient API post() method => Authenticate
	authenticate(user: any): Observable<AuthToken> {
		user.password = Md5.hashStr(user.password);
		return this.http.post<AuthToken>(
			this.apiURL + '/authenticate',
			JSON.stringify(user),
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	register(user: any, roleName: any, affiliateMail: any): Observable<AuthToken> {
		return this.http.post<AuthToken>(
			this.apiURL + '/create',
			JSON.stringify({ user, roleName, affiliateMail }),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	modify(employee: any): Observable<Clients> {
		return this.http.post<Clients>(
			this.apiURL + '/update',
			JSON.stringify({ user: employee }),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	suspend(employee: any): Observable<Clients> {
		return this.http.post<Clients>(
			this.apiURL + '/banuser',
			JSON.stringify(employee),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	delete(employee: any): Observable<Clients> {
		return this.http.post<Clients>(
			this.apiURL + '/delete',
			JSON.stringify({ user: employee }),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	postConnectionLogs(connectionLog: any): Observable<ConnectionLogs> {
		return this.http.post<ConnectionLogs>(
			this.apiNoSQLURL + '/connectionLogs',
			JSON.stringify(connectionLog),
			this.httpOptions
		).pipe(retry(0), catchError(this.handleError));
	}

	getConnectionLogs(): Observable<ConnectionLogs[]> {
		return this.http.get<ConnectionLogs[]>(
			this.apiNoSQLURL + '/connectionLogs',
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	getAllUsers(): Observable<Clients[]> {
		return this.http.get<Clients[]>(
			this.apiURL + '/AllUsers',
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	getRestaurants(): Observable<Restaurants[]> {
    	return this.http.get<Restaurants[]>(
      	this.controllerUrl + '/restaurants',
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	getOrdersHistory(clientId: number): Observable<Order[]> {
    	return this.http.get<Order[]>(
			this.controllerUrl + '/orders/clients/' + clientId,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

  	FetchArticleData(id: string): Observable<Articles[]> {
    	return this.http.get<Articles[]>(
			this.controllerUrl + '/articles/' + id,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

  	FetchMenusData(id: string): Observable<Menus[]> {
    	return this.http.get<Menus[]>(
			this.controllerUrl + '/menus/' + id,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	sendCreatedOrder(order: Order){
		return this.http.post<Order>(
			this.controllerUrl + '/orders',
			JSON.stringify(order),
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	// Error handling
	handleError(error: any) {
		console.log(error);
		let errorObj = { errorCode: Number, errorMsg: '' };
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorObj.errorMsg = error.error.message;
		} else {
			// Get server-side error
			errorObj = { errorCode: error.status, errorMsg: error.error };
		}
		//window.alert(errorMessage);
		return throwError(() => errorObj);
	}
}

