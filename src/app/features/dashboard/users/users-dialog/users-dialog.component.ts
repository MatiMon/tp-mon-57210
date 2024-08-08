import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser, Role } from '../user.model';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.css'
})
export class UsersDialogComponent {

  userForm : FormGroup;
  roles = Object.values(Role);

  constructor(private fb : FormBuilder, 
    private matDialogRef: MatDialogRef<UsersDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingUser: IUser
  ) {
    this.userForm = fb.group({
      username: [null, Validators.required],
      role: [null, Validators.required],
    })

    if(this.editingUser){
      this.userForm.patchValue(this.editingUser)
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.matDialogRef.close(
        this.editingUser?
        {...this.userForm.value, id: this.editingUser.id}:
        {...this.userForm.value}
      );
    } else {
      //TODO error
    }
  }

}
