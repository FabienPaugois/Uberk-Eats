import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { OrdersObject } from '../model/order';
import { Notifications } from '../model/notifications';
@Injectable({
	providedIn: 'root',
})
export class NotificationsApiService {
	// Define API
	apiURL = 'http://localhost:8080';
	//apiURL = 'https://localhost:44310';
	apiNoSQLURL = 'http://localhost:9000';
	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('JWT')
		}),
	};

	constructor(private http: HttpClient) { }
	/*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

	getUserUnreadNotifications(userId: number): Observable<Notifications[]> {
		return this.http.get<Notifications[]>(
			this.apiNoSQLURL + '/notifications/unread/' + userId,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	markNotificationsAsRead(userId: number): Observable<unknown> {
		return this.http.put<unknown>(
			this.apiNoSQLURL + '/notifications/markAsRead/' + userId,
			{ userId: NaN, content: '', title: '', createdAt: new Date(), hasBeenRead: true },
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

	getUserNotifications(userId: number): Observable<Notifications[]> {
		return this.http.get<Notifications[]>(
			this.apiNoSQLURL + '/notifications/' + userId,
			this.httpOptions
		).pipe(retry(1), catchError(this.handleError));
	}

  postNewNotification(notification: any): Observable<Notifications> {
		return this.http.post<Notifications>(
			this.apiNoSQLURL + '/notifications',
			JSON.stringify(notification),
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

