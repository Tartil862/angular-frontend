import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  user: user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}
  

  onSubmit(): void {
    console.log('User payload:', this.user);  // Log the payload to verify it
    this.userService.loginUser(this.user).subscribe(
      (response: { message: string; user: user }) => {  // Ensure response is typed correctly
        const user = response.user;  // Access the user object from the response

        // Store the entire user object in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on role
        const role = user.role;
        if (role === 'admin') {
          this.router.navigate(['/admin']);  // Redirect to admin page
        } else if (role === 'user') {
          this.router.navigate(['/recipe']);  // Redirect to user home page
        } else {
          this.router.navigate(['/']);  // Default route
        }
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);  // Log error for debugging
      }
    );
  }
}
