import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();  // Fetch all users when the component initializes
  }

  // Fetch users with role 'user'
  fetchUsers(): void {
    this.userService.getUsersByRole('user').subscribe(
      (response: any[]) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Delete a user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response: any) => {
        console.log(response.message);
        this.fetchUsers();  // Refresh the user list after deletion
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  onLogout(): void {
    this.userService.logout();  // Log out the user
  }
   // Navigate to the profile page
   navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
