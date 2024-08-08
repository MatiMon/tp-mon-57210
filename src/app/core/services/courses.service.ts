import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../../features/dashboard/courses/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>('http://localhost:3000/courses');
  }

  create(course: ICourse) {
    return this.httpClient.post('http://localhost:3000/courses', course);
  }

  editById(id: string, update: Partial<ICourse>) {
    return this.httpClient.put('http://localhost:3000/courses/' + id, update, {
    });
  }

  deleteById(id: string) {
    return this.httpClient.delete('http://localhost:3000/courses/' + id);
  }
}
