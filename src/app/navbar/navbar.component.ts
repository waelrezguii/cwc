import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private usersService: UsersService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }

  getLoggedInUser(): any {
    return this.usersService.getLoggedInUser();
  }

  logout(): void {
    this.usersService.logout();
    this.router.navigate(['/']); // Navigate to home or login page after logout
  }
}
