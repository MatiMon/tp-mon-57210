import { Component } from '@angular/core';
import { IEnrollment } from './enrollment.model';
import { EnrollmentsDialogComponent } from './enrollments-dialog/enrollments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css'
})
export class EnrollmentsComponent {

  enrollmentsList : IEnrollment[] = []; // [{id: 1, studentId: '1', courseId: '1'}]
  displayedColumns: string[] = ['id', 'studentId', 'courseId', 'actions'];
  lastId = 1;

  constructor(private matDialog: MatDialog, private service: EnrollmentsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // this.loading = false;
    this.service.getAll().subscribe({
      next: (dataFromDB) => {
        this.enrollmentsList = dataFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert('Inscripciones no encontradas');
          }
        }
      },
      complete: () => {
        // this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog.open(EnrollmentsDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value) {
          this.lastId += 1;
          value.id = this.lastId;
          this.enrollmentsList = [...this.enrollmentsList, value];
        }
      }
    });

  }

  deleteById(id : number) {
    if(confirm('¿Esta seguro que desea eliminar?')) {
      this.enrollmentsList = this.enrollmentsList.filter((e) => e.id != id)
    }
  }

  edit(enrollment: IEnrollment) {
    this.matDialog
      .open(EnrollmentsDialogComponent, { data: enrollment })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.enrollmentsList = this.enrollmentsList.map(
              (e) => e.id === value.id ? value : e)
          }
        },
      });
  }

  getRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

}
