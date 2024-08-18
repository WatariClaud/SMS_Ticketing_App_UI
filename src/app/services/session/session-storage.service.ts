import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(private cookieService: CookieService) { }

  startSession(token: string) {
    this.cookieService.set('jwt', token);
  }

  getToken(): string | null {
    return this.cookieService.get('jwt');
  }

  endSession() {
    // Clear the session storage
    sessionStorage.clear();

    // Clear the local storage
    localStorage.clear();

    // Redirect to the login page


    // TODO: to include logic to end the session here (e.g. log out the user)

  }
}
