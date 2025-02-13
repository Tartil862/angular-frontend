import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject necessary services
  const userService = inject(UserService);
  const router = inject(Router);

  // Get current user from localStorage using UserService
  const user = userService.currentUser;

  if (user) {
    // Check if route requires a specific role
    const expectedRole = route.data['role'];  // Get expected role from route data

    if (expectedRole && expectedRole !== user.role) {
      // Redirect if user role does not match the expected role
      router.navigate(['/']);
      return false;
    }
    
    // Allow access if user is logged in and role matches
    return true;
  }

  // If no user is logged in, redirect to signin page
  router.navigate(['/signin']);
  return false;
};
