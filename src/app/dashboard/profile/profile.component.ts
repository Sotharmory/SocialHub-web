import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: User | null = null;
  profileForm: FormGroup;
  loading = false;
  error = '';
  successMessage = '';

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      location: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile(): Promise<void> {
    try {
      this.loading = true;
      this.profile = await this.profileService.getProfile();
      this.populateForm();
    } catch (error) {
      console.error('Error loading profile:', error);
      this.error = 'Failed to load profile';
    } finally {
      this.loading = false;
    }
  }

  private populateForm(): void {
    if (this.profile) {
      this.profileForm.patchValue({
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        email: this.profile.email,
        bio: this.profile.bio || '',
        location: this.profile.location || '',
        website: this.profile.website || ''
      });
    }
  }

  /**
   * Enhanced profile update method
   */
  async updateProfileWithValidation(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      
      // Validate profile data
      if (!this.profileForm.valid) {
        this.error = 'Please fill in all required fields';
        return;
      }

      const result = await this.profileService.updateProfile(this.profileForm.value);
      if (result.success) {
        this.successMessage = 'Profile updated successfully';
        this.loadProfile();
      } else {
        this.error = result.message || 'Failed to update profile';
      }
    } catch (error) {
      console.error('Profile update error:', error);
      this.error = 'An unexpected error occurred';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(file: File): Promise<void> {
    try {
      this.loading = true;
      const result = await this.profileService.uploadProfilePicture(file);
      if (result.success) {
        this.profile!.picture = result.pictureUrl;
        this.successMessage = 'Profile picture updated';
      } else {
        this.error = result.message || 'Failed to upload picture';
      }
    } catch (error) {
      console.error('Picture upload error:', error);
      this.error = 'Failed to upload picture';
    } finally {
      this.loading = false;
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.updateProfileWithValidation();
    }
  }
}



