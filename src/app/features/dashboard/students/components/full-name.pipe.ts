import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../student.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(student: IStudent): string {
    const name = student.name ? student.name : '';
    const lastname = student.lastname ? student.lastname : '';
    return `${name} ${lastname}`.trim();
  }

}
