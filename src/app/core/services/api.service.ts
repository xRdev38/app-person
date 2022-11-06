import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  private static formatErrors(error: Error) {
    return throwError(error.message);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(`${environment.api_url}${path}`, { params })
      .pipe(catchError((error: Error) => ApiService.formatErrors(error)));
  }

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .put<T>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError((error: Error) => ApiService.formatErrors(error)));
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .post<T>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError((error: Error) => ApiService.formatErrors(error)));
  }

  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.api_url}${path}`)
      .pipe(catchError((error: Error) => ApiService.formatErrors(error)));
  }
}
