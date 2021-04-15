import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Utilisateur } from './utilisateur.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: Utilisateur;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree  {
        const currentUser = this.authenticationService.currentUserValue;
        console.log('cc '+ currentUser);
        if (this.currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}