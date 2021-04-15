import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { Utilisateurs } from './utilisateur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'assignment';
  utilisateur: Utilisateurs;

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.utilisateur = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
