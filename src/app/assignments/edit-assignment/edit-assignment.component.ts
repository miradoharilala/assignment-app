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
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  assignment: Assignment = new Assignment();
  matieresCtrl = new FormControl();
  elevesCtrl = new FormControl();
  filteredMatieres: Observable<Matiere[]>;
  filteredEleves: any;
  eleves: Matiere[];
  matieres: Matiere[] = [];
  nomEleve;
  nomMatiere;
  disableSaveButton: boolean;
  boutonRetour = 'Annuler';


  constructor(private service: AssignmentsService, private http: HttpClient, private route: ActivatedRoute, private loggingService: LoggingService) {
  }


  private _filterMatieres(value: string): Matiere[] {
    if(typeof value === "string") {
    const filterValue = value.toLowerCase();

    return this.matieres.filter(matiere => matiere.nom.toLowerCase().indexOf(filterValue) === 0 || matiere.professeur.nom.toLowerCase().indexOf(filterValue) === 0);
    }
  }


  ngOnInit(): void {
    this.getAssignmentById();

    this.service.getMatieres('').subscribe((data) => {
      this.matieres = data;
    });

    this.filteredMatieres = this.matieresCtrl.valueChanges
      .pipe(
        startWith(''),
        map(matiere => matiere ? this._filterMatieres(matiere) : this.matieres.slice())
      );

    this.elevesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          // this.errorMsg = "";
          this.filteredEleves = [];
          // this.isLoading = true;
        }),
        switchMap((value) => 
          this.http.get( environment.baseUri + '/eleves?key=' + value
        )
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

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.service.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      this.elevesCtrl.setValue(this.assignment.eleve);
      this.matieresCtrl.setValue(this.assignment.matiere);
    });
  }

  changeMatiere(event) {
    this.assignment.matiere = event;
  }

  getNomMatiere(matiere) {
    if(matiere) return matiere.nom;
  }

  changeEleve(event) {
    this.assignment.eleve = event;
  }

  getNomEleve(eleve) {
    if(eleve) return eleve.nom;
  }

  modifier() {
    this.service.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.disableSaveButton = true;
        this.boutonRetour = 'Retour à l\'accueil';
        this.loggingService.notifier('Assignment modifié');
      })
  }

}
