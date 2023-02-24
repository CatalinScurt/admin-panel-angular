import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    login(username: string, password: string) {
        return this.apiService.post('/auth', { username, password }).pipe(
            tap((response: any) => {
                this.apiService.token = response.accessToken
            })
        )
    }

    refresh() {
        return this.apiService.get('/auth/refresh').pipe(
            tap((response: any) => {
                this.apiService.token = response.accessToken
                console.log(response, 'refresh')
            }),
            catchError(err => {
                this.router.navigate([''])
                return throwError(() => err)
            })
        )
    }

    logOut() {
        return this.apiService.post('/auth/logout')
    }
}
