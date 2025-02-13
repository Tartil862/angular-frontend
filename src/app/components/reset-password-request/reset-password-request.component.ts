import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.email) {
      this.userService.resetPasswordRequest(this.email).subscribe(
        (response) => {
          this.successMessage = 'A reset link has been sent to your email.';
          this.errorMessage = '';  // Clear any existing error message
        },
        (error) => {
          this.errorMessage = 'A reset link has been sent to your email.';
          this.successMessage = ''; // Clear success message in case of error
        }
      );
    } else {
      this.errorMessage = 'Please enter your email address.';
      this.successMessage = ''; // Clear success message when email is missing
    }
  }
}
