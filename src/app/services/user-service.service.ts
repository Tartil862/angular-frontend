import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `https://spring-backend-production-bbb4.up.railway.app/users`;
  private apiUrl1 = `https://spring-backend-production-bbb4.up.railway.app/auth`;
  
  constructor(private http: HttpClient, private router: Router) {}

  // Register user
  registerUser(user: user): Observable<user> {
    return this.http.post<user>(`${this.apiUrl}/signup`, user);
  }

  // Login user
  loginUser(user: user): Observable<{ message: string; user: user }> {
    return this.http.post<{ message: string; user: user }>(`${this.apiUrl}/signin`, user);
  }

  

  // Logout user
  logout(): void {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    this.router.navigate(['/signin']);
  }

  // Get current user from localStorage
  get currentUser(): user | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Store user in localStorage
  storeUser(user: user): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Redirect based on user role after login
  redirectUser(user: user): void {
    const role = user.role;
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'user') {
      this.router.navigate(['/userHome']);
    }
  }
  resetPasswordRequest(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/reset-password-request?email=${email}`, {});
  }
  

  // Reset the password with email
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/reset-password?email=${email}&newPassword=${newPassword}`, {});
  }

  // Fetch all users with role 'user'
  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allusers?role=${role}`);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateProfile(updatedUser: any): Observable<any> {
    return this.http.put('https://spring-backend-production-bbb4.up.railway.app/users/update', updatedUser);  // Adjust the endpoint as needed
  }

}
