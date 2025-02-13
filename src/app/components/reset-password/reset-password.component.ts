import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = ''; // This will be set from the route parameter
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the email from the URL query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];  // Get email from URL query parameters
    });
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';  // Clear success message
      return;
    }

    this.userService.resetPassword(this.email, this.newPassword).subscribe(
      (response) => {
        this.successMessage = 'Password has been successfully reset.';
        this.errorMessage = ''; // Clear error message
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Password has been successfully reset.'; // General error handling
        this.successMessage = ''; // Clear success message
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 2000);
      }
    );
  }
}
