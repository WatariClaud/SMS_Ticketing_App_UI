import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  endSession() {
    // Clear the session storage
    sessionStorage.clear();

    // Clear the local storage
    localStorage.clear();

    // Redirect to the login page


    // TODO: to include logic to end the session here (e.g. log out the user)

  }
}
