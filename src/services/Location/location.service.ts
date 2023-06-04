import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RootLocation } from 'src/app/Models/location';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpclient:HttpClient) { 

  }

  getLocationData(city:string): Observable<any> {
    return this.httpclient.get<any>(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4dbccbf79d4d278c8794f441f03b2c09`,environment.options)
  .pipe(
    catchError(this.handleError)
  );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
