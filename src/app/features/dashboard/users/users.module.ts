import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    MatButtonModule, 
    MatIconModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
