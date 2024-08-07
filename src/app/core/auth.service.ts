import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser, Role } from '../features/dashboard/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private VALID_TOKEN = 'lksfdjglfdkgjklfdkjgldfjisdhfjsdfsdk';

  private _authUser = new BehaviorSubject<IUser | null>(null);
  authUser = this._authUser.asObservable();

  private FAKE_USER = {
    id: 123,
    username: 'admin',
    role: Role.ADMIN
  }

  constructor(private router: Router) {}

  login(data: { email: string; password: string ; role: string}) {
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['dashboard', 'courses'])
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login'])
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token')
    const isValid = this.VALID_TOKEN === token;
    
    if(isValid) {
      this._authUser.next(this.FAKE_USER)
    }
    return of(isValid);
  }
}
