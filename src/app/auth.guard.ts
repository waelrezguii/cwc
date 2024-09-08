import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (state.url === '/add-player' && !this.usersService.isLoggedIn()) {
      // If user is not logged in and trying to access add-player, redirect to login
      this.router.navigate(['/login']);
      return false;
    } else if (state.url === '/login' && this.usersService.isLoggedIn()) {
      // If user is logged in and trying to access login, redirect to home or dashboard
      this.router.navigate(['/']);
      return false;
    } else {
      // Allow access to other routes
      return true;
    }
  }
}
