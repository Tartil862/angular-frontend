import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  photoUrl: string = '';
  role: string = 'user';  // Default role

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.photoUrl = user.photoUrl;
      this.role = user.role;
    }
  }

  onSave(): void {
    const updatedUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      photoUrl: this.photoUrl,
      role: this.role
    };
  
    this.userService.updateProfile(updatedUser).subscribe(
      (response) => {
        // Handle successful profile update
        console.log('Profile updated successfully', response);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Show the success alert
        alert('You have successfully changed your profile!');
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
  

  // Handle the file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;  // Store base64 string as the new photo URL
      };
      reader.readAsDataURL(file);  // Convert image to base64 string
    }
  }

  // Function to trigger file input change
  changePhoto(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();  // Programmatically trigger file selection dialog
    }
  }
}
