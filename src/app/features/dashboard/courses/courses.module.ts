import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog/courses-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatDatepickerModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
