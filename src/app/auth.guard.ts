import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { verifyToken } from '../app/globals/functions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authorized_guard') || '';
    const isValidToken = verifyToken(token);
    const isAuthRoute = state.url === '/security/authenticate';
    
    if (isValidToken) {
      if (isAuthRoute) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (!isAuthRoute) {
        this.router.navigate(['/security/authenticate']);
        return false;
      }
      return true;
    }
  }
}
