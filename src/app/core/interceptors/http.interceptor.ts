import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.IsAuthenticated()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getUserToken()}`
      }
    });
  }

  return next(req).pipe(
    retry(2),
    catchError((error) => {
      if (error.status === 401) {
        authService.logoutUser();
      }
      const errorMessage = error.error.message || error.statusText;
      return throwError(() => new Error(errorMessage));
    }));
};
