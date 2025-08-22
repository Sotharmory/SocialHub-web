import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Check for query parameters (for messages from registration)
    const queryParams = this.router.getCurrentNavigation()?.extras.queryParams;
    if (queryParams && queryParams['registered'] === 'true') {
      this.successMessage = 'Registration successful! Please log in with your credentials.';
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login successful', response);
        // Navigate to dashboard after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    });
  }

  /**
   * Enhanced login method with better error handling
   */
  async enhancedLogin(): Promise<void> {
    try {
      this.loading = true; // Changed from isLoading to loading
      this.error = ''; // Changed from errorMessage to error
      
      // Validate form before submission
      if (!this.loginForm.valid) {
        this.error = 'Please fill in all required fields'; // Changed from errorMessage to error
        return;
      }

      const result = await this.authService.login(this.loginForm.value);
      if (result.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = result.message || 'Login failed'; // Changed from errorMessage to error
      }
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'An unexpected error occurred'; // Changed from errorMessage to error
    } finally {
      this.loading = false; // Changed from isLoading to loading
    }
  }
} 