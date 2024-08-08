import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { IStudent } from './student.model';
import { StudentsService } from '../../../core/services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  studentsList : IStudent[] = [];
  displayedColumns: string[] = ['id', 'name', 'course', 'actions'];

  constructor(private matDialog: MatDialog, private service: StudentsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // this.loading = false;
    this.service.getAll().subscribe({
      next: (dataFromDB) => {
        this.studentsList = dataFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert('Estudiantes no encontrados');
          }
        }
      },
      complete: () => {
        // this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
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

  edit(student: IStudent) {
    this.matDialog
      .open(StudentsDialogComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.studentsList = this.studentsList.map(
              (st) => st.id === value.id ? value : st)
          }
        },
      });
  }

  getRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

}
