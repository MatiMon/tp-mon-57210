import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { IStudent } from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  studentsList : IStudent[] = [{id: 1, name:'Matias', lastname:'Mon', course:'123'}]// [];
  displayedColumns: string[] = ['id', 'name', 'course', 'actions'];
  lastId = 1;

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
      next: (value) => {
        if(value) {
          value.id = this.lastId +1;
          this.studentsList = [...this.studentsList, value];
        }
      }
    });

  }

  deleteById(id : number) {
    if(confirm('¿Esta seguro que desea eliminar?')) {
      this.studentsList = this.studentsList.filter((student) => student.id != id)
    }
  }

  edit(student: IStudent) {
    this.matDialog
      .open(StudentsDialogComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.studentsList = this.studentsList.map((student) => student.id === student.id ? {...value, id: student.id} : student)
          }
        },
      });
  }

  getRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

}
