import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AssignmentsComponent},
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent
  },
  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component: EditAssignmentComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssignmentDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
