import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(private cookieService: CookieService) { }

  startAdminSession(token: string) {
    this.cookieService.set('admin-jwt', token);
  }
  startHelpDeskSession(token: string) {
    this.cookieService.set('hr-jwt', token);
  }
  authSecGuard(token: string) {
    this.cookieService.set('guard_id', token);
  }

  getAdminToken(): string | null {
    return this.cookieService.get('admin-jwt');
  }
  getHelpDeskToken(): string | null {
    return this.cookieService.get('hr-jwt');
  }

  getGuardToken(): string | null {
    return this.cookieService.get('guard_id');
  }
  getGuardOnDuty(): string | null {
    return localStorage.getItem('guard_id');
  }

  endSession(userType: string) {
    if (userType === 'Admin') {
      this.cookieService.delete('admin-jwt');
    } else if (userType === 'HelpDesk') {
      this.cookieService.delete('hr-jwt');
    }

    if (userType === 'Guard') {
      localStorage.removeItem('guard_id');
    }

    // sessionStorage.clear(); // Not needed unless items in sessionStorage specific to userType
    // localStorage.clear(); // Not needed unless clear all local storage items
  }

  clearAllSessions() {
    this.cookieService.deleteAll();
    localStorage.clear();
  }
}
