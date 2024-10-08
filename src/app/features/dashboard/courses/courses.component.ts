import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog/courses-dialog.component';
import { ICourse } from './course.model';
import { CoursesService } from '../../../core/services/courses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  coursesList : ICourse[] = [];// [{id: 1, name:'Angular 1', startDate: new Date, endDate: new Date(new Date().setDate(new Date().getDate() + 60))}]
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];

  constructor(private matDialog: MatDialog, private service: CoursesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // this.loading = false;
    this.service.getAll().subscribe({
      next: (dataFromDB) => {
        this.coursesList = dataFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert('Cursos no encontrados');
          }
        }
      },
      complete: () => {
        // this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value) {
          value.id = this.getRandomId()
          this.service.create(value)
          .pipe(tap(() => this.loadData()))
          .subscribe();
        }
      }
    });
  }
  

  deleteById(id : string) {
    if(confirm('¿Esta seguro que desea eliminar?')) {
      this.service.deleteById(id)
      .pipe(tap(() => this.loadData()))
      .subscribe();
    }
  }

  edit(course: ICourse) {
    this.matDialog
      .open(CoursesDialogComponent, { data: course })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.coursesList = this.coursesList.map(
              (c) => c.id === value.id ? value : c)
          }
        },
      });
  }

  getRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

}
