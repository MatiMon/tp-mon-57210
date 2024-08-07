import { Component } from '@angular/core';
import { IUser, Role } from './user.model';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  usersList : IUser[] = []; //[{id: 1, username:'superusuario', role: Role.ADMIN}]// [];
  displayedColumns: string[] = ['id', 'username', 'role'];
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
          this.lastId += 1;
          value.id = this.lastId;
          this.usersList = [...this.usersList, value];
        }
      }
    });

  }

  deleteById(id : number) {
    if(confirm('¿Esta seguro que desea eliminar?')) {
      this.usersList = this.usersList.filter((u) => u.id != id)
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

}
