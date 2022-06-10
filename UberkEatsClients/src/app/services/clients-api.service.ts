import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clients } from '../model/clients'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Restaurants } from '../model/restaurants';
@Injectable({
  providedIn: 'root',
})
export class ClientsApiService {
  // Define API
  apiURL = 'http://localhost:3000';
  apiNoSQLURL = ''
  constructor(private http: HttpClient) { }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API post() method => Authenticate
  Authenticate(employee: any): Observable<Clients> {
    return this.http.post<Clients>(
        this.apiURL + '/login',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  Register(employee: any): Observable<Clients> {
    return this.http.post<Clients>(
      this.apiURL + '/register',
      JSON.stringify(employee),
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError));
  }

  GetRestaurants(): Observable<Restaurants> {
    return this.http.get<Restaurants>(
      this.apiNoSQLURL + '/restaurants',
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
    return throwError(() => {
      return errorMessage;
    });
  }
}

