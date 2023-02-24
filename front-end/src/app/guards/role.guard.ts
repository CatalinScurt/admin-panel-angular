import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService,
        private jwtHelper: JwtHelperService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        var token = this.apiService.token || ''

        const expectedRole = route.data['isAdmin']
        var tokenPayload = this.jwtHelper.decodeToken(token)
        if (!token) {
            this.authService.refresh().subscribe({
                next: response => {
                    token = response.accessToken
                    tokenPayload = this.jwtHelper.decodeToken(token)
                },
                error: error => this.router.navigate(['']),
                complete: () => this.checkForRole(tokenPayload, expectedRole)
            })
        } else {
            return this.checkForRole(tokenPayload, expectedRole)
        }
        return true;
    }
    checkForRole(tokenPayload: any, expectedRole: any) {
        if (!this.apiService.token ||
            tokenPayload?.UserInfo.isAdmin !== expectedRole) {
            this.router.navigate([''])
            return false
        } else {
            return true
        }
    }

}
