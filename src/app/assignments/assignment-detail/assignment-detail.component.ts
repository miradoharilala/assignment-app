import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment
  ) { }

  ngOnInit(): void {
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignment.id, 'edit'], {

      fragment:"edition"
    });
  }

}
