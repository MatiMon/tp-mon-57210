import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private VALID_TOKEN = 'lksfdjglfdkgjklfdkjgldfjisdhfjsdfsdk';

  constructor(private router: Router) { }

  login(data: { email: string; password: string }) {
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['dashboard', 'courses'])
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login'])
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token')
    return of(this.VALID_TOKEN === token);
  }
}
