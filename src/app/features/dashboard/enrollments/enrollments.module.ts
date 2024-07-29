import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsDialogComponent } from './enrollments-dialog/enrollments-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [EnrollmentsComponent, EnrollmentsDialogComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule,
    MatTableModule,
    SharedModule
  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule { }
