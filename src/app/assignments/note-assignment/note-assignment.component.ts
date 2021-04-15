import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { LoggingService } from 'src/app/shared/logging.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-note-assignment',
  templateUrl: './note-assignment.component.html',
  styleUrls: ['./note-assignment.component.css']
})
export class NoteAssignmentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
    public dialogRef: MatDialogRef<NoteAssignmentComponent>,
    private service: AssignmentsService,
    private logging: LoggingService
    ) { }

  ngOnInit(): void {
    this.assignment.note = null;
  }

  noterAssignment() {
    this.assignment.rendu = true;
    this.service.updateAssignment(this.assignment).subscribe(message => {
      this.logging.notifier('Assignment noté');
      this.dialogRef.close({event: 'noted'});
    });
  }

  fermer() {
    this.dialogRef.close({event: 'closed'});
  }


}
