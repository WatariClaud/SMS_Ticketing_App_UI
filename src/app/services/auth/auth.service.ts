import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../../models/User';
import { LogInBody } from '../../models/auth.model';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE, LOCAL_STORAGE_KEYS } from '../../core/constants/storage.constant';
import { SessionStorageService } from '../session/session-storage.service';
import { RoleLower } from '../../core/domain/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionStorageService,
  ) { }

  loginUser(request: LogInBody): Observable<any> {
    return this.http.post<any>(
      API_ENDPOINTS.user.login,
      request
    ).pipe(
      map((response: any) => {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.user_token,
          response.access
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.refresh_token,
          response.refresh
        );
        this.isAuthenticated.update(() => true);

        // get user details
        this.getUserDetails().subscribe({
          next: (user) => {
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.user,
              JSON.stringify(user)
            );
            const userRole = String(user.role).toLocaleLowerCase();

            if (userRole === RoleLower.ADMIN) {
              this.sessionService.startAdminSession(response.access);
              this.router.navigate(['/admin']);
            } else if (userRole === RoleLower.TELLER) {
              this.sessionService.startHelpDeskSession(response.access);
              this.router.navigate(['/hr']);
            } else if (userRole === RoleLower.SECURITY) {
              this.sessionService.authSecGuard(response.access);
              this.router.navigate(['/']);
            }
            else {
              this.router.navigate(['/']);
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
        return response;
      })
    );
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.user.userDetails);
  }


  IsAuthenticated(): boolean {
    const token = localStorage.getItem(LOCAL_STORAGE.user_token);
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  getUserToken(): string {
    return localStorage.getItem(LOCAL_STORAGE.user_token) || '';
  }

  getSessionUser(): User {
    const user = localStorage.getItem(LOCAL_STORAGE.user);
    return user ? JSON.parse(user) : null;
  }

  logoutUser(): void {
    localStorage.removeItem(LOCAL_STORAGE.user);
    localStorage.removeItem(LOCAL_STORAGE.user_token);
    localStorage.removeItem(LOCAL_STORAGE.refresh_token);
    this.sessionService.clearAllSessions();
    this.router.navigate(['/login']);
  }
}
