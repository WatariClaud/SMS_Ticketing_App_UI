import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetState {
  private routeSubject = new BehaviorSubject<string>('');
  route: string = '/';

  constructor(private router: Router) {}

  // Method to get the current route as a string
  returnRoute(): string {
    this.route = this.router.url;
    return this.route;
  }
}
