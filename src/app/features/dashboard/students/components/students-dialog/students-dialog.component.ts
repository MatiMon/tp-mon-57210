import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../student.model';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.css'
})
export class StudentsDialogComponent {

  studentForm : FormGroup;

  constructor(private fb : FormBuilder, 
    private matDialogRef: MatDialogRef<StudentsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingStudent?: IStudent
  ) {
    this.studentForm = fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      course: [null, Validators.required]
    })

    if(this.editingStudent){
      this.studentForm.patchValue(this.editingStudent)
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.matDialogRef.close(this.studentForm.value);
    } else {
      //TODO error
    }
  }

}
