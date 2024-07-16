import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
