import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from './assignment.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  @ViewChild('scrollerRendus') scrollerRendus: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendus') scrollerNonRendus: CdkVirtualScrollViewport;

  assignmentsRendus: Assignment[] = [];
  assignmentsNonRendus: Assignment[] = [];
  pageRendu: number = 1;
  pageNonRendu: number = 1;
  limit: number = 10;
  totalDocsRendu: number;
  totalDocsNonRendu: number;
  totalPagesRendu: number;
  totalPagesNonRendu: number;
  hasPrevPageRendu: boolean;
  hasPrevPageNonRendu: boolean;
  prevPageRendu: number;
  prevPageNonRendu: number;
  hasNextPageRendu: boolean;
  hasNextPageNonRendu: boolean;
  nextPageRendu: number;
  nextPageNonRendu: number;
  loading = false;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.getPlusDAssignmentsPourScrolling(false);
      this.getPlusDAssignmentsPourScrolling(true);
    });
  }

  getPlusDAssignmentsPourScrolling(rendu: Boolean) {
    const page = rendu ? this.pageRendu : this.pageNonRendu;
    this.loading = true;
    this.assignmentsService
      .getAssignmentsPagine(page, this.limit, rendu)
      .subscribe((data) => {
        this.loading = false;
        // au lieu de remplacer this.assignments par les nouveaux assignments récupérés
        // on va les ajouter à ceux déjà présents...
        if (rendu) {
          this.assignmentsRendus = this.assignmentsRendus.concat(data.docs);
          this.pageRendu = data.page;
          this.limit = data.limit;
          this.totalDocsRendu = data.totalDocs;
          this.totalPagesRendu = data.totalPages;
          this.hasPrevPageRendu = data.hasPrevPage;
          this.prevPageRendu = data.prevPage;
          this.hasNextPageRendu = data.hasNextPage;
          this.nextPageRendu = data.nextPage;
        } else {
          this.assignmentsNonRendus = this.assignmentsNonRendus.concat(data.docs);
          this.pageNonRendu = data.page;
          this.limit = data.limit;
          this.totalDocsNonRendu = data.totalDocs;
          this.totalPagesNonRendu = data.totalPages;
          this.hasPrevPageNonRendu = data.hasPrevPage;
          this.prevPageNonRendu = data.prevPage;
          this.hasNextPageNonRendu = data.hasNextPage;
          this.nextPageNonRendu = data.nextPage;
        }
        // this.assignments = [...this.assignments, ...data.docs];

        console.log("données reçues");
      });
  }

  ngAfterViewInit() {
    // Appelé automatiquement après l'affichage, donc l'élément scroller aura
    // et affiché et ne vaudra pas "undefined" (ce qui aurait été le cas dans ngOnInit)

    // On va s'abonner aux évenements de scroll sur le scrolling...
    this.scroll(this.scrollerRendus);
    this.scroll(this.scrollerNonRendus);
  }

  scroll(scroller: CdkVirtualScrollViewport) {
    scroller
      .elementScrolled()
      .pipe(
        map((event) => {
          return scroller.measureScrollOffset("bottom");
        }),
        pairwise(),
        /*
        tap(([y1, y2]) => {
          if(y2 < y1) {
            console.log("ON SCROLLE VERS LE BAS !")
          } else {
            console.log("ON SCROLLE VERS LE HAUT !")
          }
        }),
        */
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        throttleTime(200) // on ne va en fait envoyer le dernier événement que toutes les 200ms.
        // on va ignorer tous les évéments arrivés et ne garder que le dernier toutes
        // les 200ms
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          if (scroller === this.scrollerRendus) {
            if (this.hasNextPageRendu) {
              this.pageRendu = this.nextPageRendu;
              console.log(
                "Je charge de nouveaux assignments page = " + this.pageRendu
              );
              this.getPlusDAssignmentsPourScrolling(true);
            }
          } if (scroller === this.scrollerNonRendus) {
            if (this.hasNextPageNonRendu) {
              this.pageNonRendu = this.nextPageNonRendu;
              console.log(
                "Je charge de nouveaux assignments page = " + this.pageNonRendu
              );
              this.getPlusDAssignmentsPourScrolling(false);
            }
          }
        });
      });
  }


  onClickEdit(assignment) {
    this.router.navigate(['/assignment', assignment.id, 'edit'], {

      fragment:"edition"
    });
  }

  getAssignments(rendu: Boolean) {
    const page = rendu ? this.pageRendu : this.pageNonRendu;
    this.assignmentsService
      .getAssignmentsPagine(page, this.limit, rendu)
      .subscribe((data) => {
        rendu ? this.assignmentsRendus = data.docs : this.assignmentsNonRendus = data.docs;
        if (rendu) {
          this.pageRendu = data.page;
          this.limit = data.limit;
          this.totalDocsRendu = data.totalDocs;
          this.totalPagesRendu = data.totalPages;
          this.hasPrevPageRendu = data.hasPrevPage;
          this.prevPageRendu = data.prevPage;
          this.hasNextPageRendu = data.hasNextPage;
          this.nextPageRendu = data.nextPage;
        } else {
          this.pageNonRendu = data.page;
          this.limit = data.limit;
          this.totalDocsNonRendu = data.totalDocs;
          this.totalPagesNonRendu = data.totalPages;
          this.hasPrevPageNonRendu = data.hasPrevPage;
          this.prevPageNonRendu = data.prevPage;
          this.hasNextPageNonRendu = data.hasNextPage;
          this.nextPageNonRendu = data.nextPage;
        }
        console.log("données reçues");
      });
  }


  onDeleteAssignment(assignment: Assignment) {
    // event = l'assignment à supprimer
    const estRendu = assignment.rendu;
    if (confirm("Êtes-vous sûr de supprimer l'assignment de l'élève " + assignment.eleve.nom + " sur la matière "
      + assignment.matiere.nom + " du " + assignment.dateDeRendu
    )) {
      this.assignmentsService.deleteAssignment(assignment).subscribe((message) => {
        this.loggingService.notifier('Assignment supprimé');
      });
    }

  }

  openDialog(assignment) {
    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      data: assignment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
