import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login-admin`, credentials).pipe(
      tap((res: any) => {
        const data = res.resultData || res;
        const token = data.access_token || data.token;
        const user = data.admin || data.user;
        
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/api/v1/auth/logout`, {}).subscribe({
      next: () => console.log('Logged out securely from server'),
      error: (err) => console.error('Logout error', err)
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token !== 'null' && token !== 'undefined';
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
