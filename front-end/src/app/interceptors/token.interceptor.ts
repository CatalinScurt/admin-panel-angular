import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private jwtHelper: JwtHelperService,
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.includes('auth')) {
            console.log("auth")
            return next.handle(request)
        }
        const token = this.apiService.token

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            console.log("istoken")
            return next.handle(request)
        } else {
            console.log("notoken")

            return this.authService.refresh().pipe(
                switchMap(token => {
                    console.log(token, 'interceptor')
                    const transformReq = request.clone({
                        headers: request.headers.set(
                            'Authorization', `Bearer ${token.accessToken}`
                        )
                    })
                    return next.handle(transformReq)
                })
            )
        }
    }
}
