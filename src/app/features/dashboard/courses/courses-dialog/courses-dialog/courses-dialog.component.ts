import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICourse } from '../../course.model';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.css'
})
export class CoursesDialogComponent {

  courseForm : FormGroup;

  constructor(private fb : FormBuilder, 
    private matDialogRef: MatDialogRef<CoursesDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingCourse: ICourse
  ) {
    this.courseForm = fb.group({
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    })

    if(this.editingCourse){
      this.courseForm.patchValue(this.editingCourse)
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.matDialogRef.close(
        this.editingCourse?
        {...this.courseForm.value, id: this.editingCourse.id}:
        {...this.courseForm.value}
      );
    }
    
  }

}
