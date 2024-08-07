import { Component } from '@angular/core';
import { IUser, Role } from './user.model';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  usersList : IUser[] = [];
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  lastId = 1;

  constructor(private matDialog: MatDialog, private service: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // this.loading = false;
    this.service.getAll().subscribe({
      next: (dataFromDB) => {
        this.usersList = dataFromDB;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            alert('Usuarios no encontrados');
          }
        }
      },
      complete: () => {
        // this.loading = false;
      },
    });
  }


  openDialog(): void {
    this.matDialog.open(UsersDialogComponent).afterClosed().subscribe({
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

  edit(user: IUser) {
    this.matDialog
      .open(UsersDialogComponent, { data: user })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.usersList = this.usersList.map(
              (u) => u.id === value.id ? value : u)
          }
        },
      });
  }

  getRandomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

}
