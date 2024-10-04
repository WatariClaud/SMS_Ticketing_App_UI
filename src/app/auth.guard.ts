import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { verifyToken } from '../app/globals/functions';
import { SessionStorageService } from './services/session/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const guardId = this.sessionStorageService.getGuardOnDuty() || '';
    const isValidToken = verifyToken(guardId);
    const isAuthRoute = state.url === '/security/authenticate';
    if (!isValidToken) {
      if (!isAuthRoute) {
        this.router.navigate(['/security/authenticate']);
        return false;
      }
      return true;
    } else {
      if (isAuthRoute) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
