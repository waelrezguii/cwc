import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  login(): void {
    if (this.email && this.password) {
      this.usersService.login(this.email, this.password)
        .subscribe(
          response => {
            console.log('Login successful:', response);
            this.router.navigate(['/']);          },
          error => {
            console.error('Login error:', error);
            this.loginError = error.error.message; // Display error message to user
          }
        );
    } else {
      this.loginError = 'Veuillez entrer votre email et mot de passe.';
    }
  }
}
