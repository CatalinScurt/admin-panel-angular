import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }
    baseURL = 'http://localhost:3500'
    token = null
    error = ''

    /**
      * Get Function
      * @param url the url
      * @returns Observable
      */
    get(url: string): Observable<any> {
        return this.httpClient.get(`${this.baseURL}` + url, { withCredentials: true }).pipe(
            catchError(err => this.catchAuthError(err),)
        )
    }

    /**
     * Post Function
     * @param url the url
     * @param data object
     * @returns Observable
     */
    post(url: string, data?: any): Observable<any> {
        return this.httpClient.post(`${this.baseURL}` + url, data, { withCredentials: true }).pipe(
            catchError(err => this.catchAuthError(err),)
        )
    }

    /**
     * Update Function
     * @param url the url
     * @param data object
     * @returns Observable
     */
    update(url: string, data?: any): Observable<any> {
        return this.httpClient.patch(`${this.baseURL}` + url, data).pipe(
            catchError(err => this.catchAuthError(err))
        )
    }

    /**
   * Delete Function
   * @param url the url
   * @param data object
   * @returns Observable
   */
    delete(url: string, data: any): Observable<any> {
        console.log(data)
        return this.httpClient.delete(`${this.baseURL}` + url, { body: { data } }).pipe(
            catchError(err => this.catchAuthError(err))
        )
    }

    catchAuthError(error: any): Observable<Response> {
        if (error && error.error && error.error.message) {
            //client-side error
            this.error = error.error.message
        } else if (error && error.message) {
            //server-side error
            this.error = error.message
        } else {
            this.error = JSON.stringify(error)
        }
        return throwError(() => error)
    }
}
