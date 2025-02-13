import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';  // Import necessary classes
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;  // Define a form group

  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {  // Inject Router
    // Initialize the form group and form controls with validators
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]), // First name validation
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Last name validation
      email: new FormControl('', [Validators.required, Validators.email]),            // Email validation
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Password pattern (letters, numbers, special characters)
      ]),
      photoUrl: new FormControl('') // You can add validation for photoUrl if needed
    });
  }

  // Getter for easy access to form controls in the template
  get f() { return this.signupForm.controls; }

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Convert the file to base64 string (same as before)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signupForm.patchValue({
          photoUrl: reader.result as string  // Set the photoUrl property in the form
        });
      };
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.signupForm.invalid) {
      return; // Don't submit if the form is invalid
    }
  
    // Add default role
    const user = { ...this.signupForm.value, Role: 'user' };  // Set role to 'user' by default
  
    this.userService.registerUser(user).subscribe(
      (response) => {
        alert('User registered successfully!');
        this.router.navigate(['/signin']);
      },
      (error) => {
        this.errorMessage = 'Error during registration.';
        console.error('Error during registration:', error);
      }
    );
  }
  
}
