import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { Utilisateurs} from './utilisateur';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<Utilisateurs>;
  public currentUser: Observable<Utilisateurs>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Utilisateurs>(JSON.parse(localStorage.getItem('Utilisateur')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get getUtilisateur(): Utilisateurs {
    return this.currentUserSubject.value;
  }

  login(email: string, motdepasse: string) {
    return this.httpClient.post<any>(`${environment.baseUri}/api/login`, { email, motdepasse })
        .pipe(map(utilisateur => {
            localStorage.setItem('Utilisateur', JSON.stringify(utilisateur));
            this.currentUserSubject.next(utilisateur);
            return utilisateur;
        }));
  }

  logout() {
    localStorage.removeItem('Utilisateur');
    this.currentUserSubject.next(null);
  }
}
