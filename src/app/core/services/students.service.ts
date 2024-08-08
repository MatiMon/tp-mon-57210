import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '../../features/dashboard/students/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>('http://localhost:3000/students');
  }

  create(student: IStudent) {
    return this.httpClient.post('http://localhost:3000/students', student);
  }

  editById(id: string, update: Partial<IStudent>) {
    return this.httpClient.put('http://localhost:3000/students/' + id, update, {
    });
  }

  deleteById(id: string) {
    return this.httpClient.delete('http://localhost:3000/students/' + id);
  }
}
