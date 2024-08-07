import { Component } from '@angular/core';
import { IUser, Role } from './user.model';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  usersList : IUser[] = [{id: 1, username:'superusuario', role: Role.ADMIN}]// [];
  displayedColumns: string[] = ['id', 'username', 'role'];
  lastId = 1;

  constructor(private matDialog: MatDialog) {}


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
