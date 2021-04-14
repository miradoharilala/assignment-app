import { Component, OnInit } from '@angular/core';
import { Eleve } from '../eleve.model';
import { Matiere } from '../matiere.model';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignment: Assignment = new Assignment();
  matieresCtrl = new FormControl();
  elevesCtrl = new FormControl();
  filteredMatieres: Observable<Matiere[]>;
  filteredEleves: any;
  eleves: Matiere[];
  matieres: Matiere[] = [];


  constructor(private service: AssignmentsService, private http: HttpClient) {
    this.service.getMatieres('').subscribe((data) => {
      this.matieres = data;
    });

    
  }


  private _filterStates(value: string): Matiere[] {
    const filterValue = value.toLowerCase();

    return this.matieres.filter(matiere => matiere.nom.toLowerCase().indexOf(filterValue) === 0 || matiere.professeur.nom.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit(): void {
    this.filteredMatieres = this.matieresCtrl.valueChanges
      .pipe(
        startWith(''),
        map(matiere => matiere ? this._filterStates(matiere) : this.matieres.slice())
      );

    this.elevesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          // this.errorMsg = "";
          this.filteredEleves = [];
          // this.isLoading = true;
        }),
        switchMap(value => this.http.get( environment.baseUri + '/eleves?key=' + value)
          .pipe(
            finalize(() => {
              // this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (!data) {
          // this.errorMsg = data['Error'];
          this.filteredEleves = [];
        } else {
          // this.errorMsg = "";
          this.filteredEleves = data;
        }

      });
  }

}
