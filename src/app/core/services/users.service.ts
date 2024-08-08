import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../features/dashboard/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('http://localhost:3000/users');
  }

  create(user: IUser) {
    return this.httpClient.post('http://localhost:3000/users', user);
  }

  editById(id: string, update: Partial<IUser>) {
    return this.httpClient.put('http://localhost:3000/users/' + id, update, {
    });
  }

  deleteById(id: string) {
    return this.httpClient.delete('http://localhost:3000/users/' + id);
  }
}
