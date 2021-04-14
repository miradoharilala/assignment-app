import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private _snackBar: MatSnackBar) { }

  log(assignmentName:string, action:string) {
    console.log("L'assignment " + assignmentName + " " + action);
  }

  notifier(message) {
    this._snackBar.open(message, 'Fermer', {
      duration: 2000,
    });
  }
}
