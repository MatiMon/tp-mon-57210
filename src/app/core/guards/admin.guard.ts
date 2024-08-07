import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { map, skip } from 'rxjs';
import { IUser, Role } from '../../features/dashboard/users/user.model';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authService = inject(AuthService);


  return authService.authUser.pipe(
    skip(1),
    map((authUser) => {
      if (authUser?.role === Role.ADMIN) {
        return true;
      } else {
        return router.createUrlTree(['dashboard', 'home']);
      }
    })
  );
};
