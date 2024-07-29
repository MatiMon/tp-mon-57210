import { Component, Inject } from '@angular/core';
import { IEnrollment } from '../enrollment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-enrollments-dialog',
  templateUrl: './enrollments-dialog.component.html',
  styleUrl: './enrollments-dialog.component.css'
})
export class EnrollmentsDialogComponent {

  enrollmentForm : FormGroup;

  constructor(private fb : FormBuilder, 
    private matDialogRef: MatDialogRef<EnrollmentsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingEnrollment: IEnrollment
  ) {
    this.enrollmentForm = fb.group({
      studentId: [, Validators.required],
      courseId: [, Validators.required]
    })

    if(this.editingEnrollment){
      this.enrollmentForm.patchValue(this.editingEnrollment)
    }
  }

  onSubmit() {
    if (this.enrollmentForm.valid) {
      this.matDialogRef.close(
        this.editingEnrollment?
        {...this.enrollmentForm.value, id: this.editingEnrollment.id}:
        {...this.enrollmentForm.value}
      );
    } else {
      //TODO error
    }
  }

}
