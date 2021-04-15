import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'assignment';
  isLoggedIn$: Observable<Utilisateur>;
  utilisateur: Utilisateur;

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
      this.isLoggedIn$ = this.authenticationService.currentUser;
        this.authenticationService.currentUser.subscribe(x => this.utilisateur = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
