import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnrollment } from '../../features/dashboard/enrollments/enrollment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IEnrollment[]> {
    return this.httpClient.get<IEnrollment[]>('http://localhost:3000/enrollments');
  }

  create(enrollment: IEnrollment) {
    return this.httpClient.post('http://localhost:3000/enrollments', enrollment);
  }

  editById(id: string, update: Partial<IEnrollment>) {
    return this.httpClient.put('http://localhost:3000/enrollments/' + id, update, {
    });
  }

  deleteById(id: string) {
    return this.httpClient.delete('http://localhost:3000/enrollments/' + id);
  }
}
