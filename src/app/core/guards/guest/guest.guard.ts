import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { RoleLower } from '../../domain/user/user';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.IsAuthenticated()) {
    const user = authService.getSessionUser();

    if (!user) {
      router.navigate(['/login']);
    }
    const userRole = String(user.role).toLocaleLowerCase();

    if (userRole === RoleLower.ADMIN) {
      router.navigate(['/admin']);
    } else if (userRole === RoleLower.TELLER) {
      router.navigate(['/hr']);
    } else if (userRole === RoleLower.SECURITY) {
      router.navigate(['/']);
    } else {
      router.navigate(['/login']);
    }
  }
  return true;
};
