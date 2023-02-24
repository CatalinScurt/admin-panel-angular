import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(private apiService: ApiService) { }

    getUsers(): Observable<any[]> {
        return this.apiService.get(`/users`)
    }

    addUser(user: any) {
        return this.apiService.post('/users', user).pipe(
            tap((response: any) => {
                console.log(response, "added")
            }))
    }

    updateUser(user: any) {
        user.isAdmin === 'true' ? user.isAdmin = true : user.isAdmin = false
        return this.apiService.update('/users', user).pipe(
            tap((response: any) => {
                console.log(response, "added")
            })
        )
    }

    deleteUser(id: string) {
        return this.apiService.delete('/users', id).pipe(
            tap((response: any) => {
                console.log(response, "delete")
            })
        )
    }

    getUserStats() {
        return this.apiService.get('/users/stats').pipe(
            tap((response: any) => {
                console.log(response, "user stats")
            })
        )
    }
}