import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  status: boolean = false; // For toggling the mobile menu

  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Toggle mobile menu
  addToggle(): void {
    this.status = !this.status;
  }

  // Navigate to a section and close the mobile menu
  navigateToSection(fragment: string): void {
    this.router.navigate(['/home'], { fragment: fragment }).then(() => {
      this.status = false; // Close the mobile menu
    });
  }


  // Check if the logged-in user is an admin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.role === 'admin';
  }

  // Check if the logged-in user is a regular user
  isUser(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.role === 'user';
  }
   // Logout functionality: clear user data and redirect to login
   onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/home']); // Redirect to signin page
  }

}
