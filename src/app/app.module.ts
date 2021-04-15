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
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'
import  { MatChipsModule } from '@angular/material/chips'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
// import { pathToFileURL } from 'node:url';
import { JwtInterceptor } from '@auth0/angular-jwt';


import { NoteAssignmentComponent } from './assignments/note-assignment/note-assignment.component';




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
    component: EditAssignmentComponent
  },
  {
    path:"login",
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AssignmentDetailComponent,
    LoginComponent,
    NoteAssignmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    HttpClientModule, ScrollingModule, MatDialogModule, MatDividerModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
