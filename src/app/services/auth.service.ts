import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  public register(data: {
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  public login(data: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      data
    );
  }

  public logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: (response) => {
        console.log('Logged out successfully');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refreshToken');

        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
