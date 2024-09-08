import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://club-world-cup-2025.onrender.com/api/v1/users'; // Base URL for user API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, mdp: password };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.user)); // Store user details in sessionStorage
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Clear sessionStorage on logout
    sessionStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    // Check if user is logged in based on sessionStorage
    return sessionStorage.getItem('loggedInUser') !== null;
  }

  getLoggedInUser(): any {
    // Retrieve logged-in user details from sessionStorage
    const userJson = sessionStorage.getItem('loggedInUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
