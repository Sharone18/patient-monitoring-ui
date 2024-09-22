import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  userId: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private apiService: ApiServiceService, private router: Router) {}

  onSubmit() {
    if (this.userId && this.password) {
      this.apiService.login(this.userId, this.password).subscribe(
        (response) => {
          // Handle successful login here
          this.router.navigate(['home']); // Redirect to home page or another route
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid user ID or password';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
