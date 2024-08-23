import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { IUser, Role } from '../../features/dashboard/users/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private VALID_TOKEN = 'jfsdk43dsakdjasb4Dsdsa$@#fS'; //lksfdjglfdkgjklfdkjgldfjisdhfjsdfsdk';

  private _authUser = new BehaviorSubject<IUser | null>(null);
  authUser = this._authUser.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(data: { email: string; password: string ; role: string}) {
    this.httpClient.get<IUser[]>('http://localhost:3000/users', {
      params: {
        email: data.email,
        password: data.password
      }
    }).subscribe({
      next: (response) => {
        if(!response.length) {
          alert('Usuario o password invalido')
        } else {
          const authUser = response [0]
          localStorage.setItem('token', authUser.token!);
          this._authUser.next(authUser)
          this.router.navigate(['dashboard', 'home'])
        }
      }
    });

    // localStorage.setItem('token', this.VALID_TOKEN);
    // this.router.navigate(['dashboard', 'courses'])
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login'])
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return this.httpClient.get<IUser[]>('http://localhost:3000/users', {
      params: {
        token: token || '',
      }
    }).pipe(
      map((response) => {
        if(response.length) {
          return false
        } else {
          const authUser = response [0]
          localStorage.setItem('token', authUser.token!);
          this._authUser.next(authUser)
          this.router.navigate(['dashboard', 'home'])
          return true;
        }
      })
    )
  }
}
