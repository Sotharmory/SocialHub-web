import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FundraisingService } from '../../../services/fundraising.service';
import { Campaign } from '../../../models/fundraising.model';

@Component({
  selector: 'app-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {
  campaigns: Campaign[] = [];
  campaignForm: FormGroup;
  loading = false;
  error = '';
  successMessage = '';
  showCreateForm = false;

  constructor(
    private fundraisingService: FundraisingService,
    private fb: FormBuilder
  ) {
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: ['', [Validators.required, Validators.min(1)]],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  async loadCampaigns(): Promise<void> {
    try {
      this.loading = true;
      this.campaigns = await this.fundraisingService.getCampaigns();
    } catch (error) {
      console.error('Error loading campaigns:', error);
      this.error = 'Failed to load campaigns';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Enhanced campaign creation with validation
   */
  async createCampaignWithValidation(): Promise<void> {
    try {
      if (!this.campaignForm.valid) {
        this.error = 'Please fill in all required fields';
        return;
      }

      this.loading = true;
      const campaignData = {
        ...this.campaignForm.value,
        goal: parseFloat(this.campaignForm.get('goal')?.value),
        endDate: new Date(this.campaignForm.get('endDate')?.value)
      };

      const result = await this.fundraisingService.createCampaign(campaignData);
      if (result.success) {
        this.successMessage = 'Campaign created successfully';
        this.campaignForm.reset();
        this.loadCampaigns();
        this.showCreateForm = false;
      } else {
        this.error = result.message || 'Failed to create campaign';
      }
    } catch (error) {
      console.error('Create campaign error:', error);
      this.error = 'Failed to create campaign';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Donate to campaign
   */
  async donateToCampaign(campaignId: string, amount: number): Promise<void> {
    try {
      this.loading = true;
      const result = await this.fundraisingService.donate(campaignId, amount);
      if (result.success) {
        this.successMessage = 'Donation successful!';
        this.loadCampaigns();
      } else {
        this.error = result.message || 'Donation failed';
      }
    } catch (error) {
      console.error('Donation error:', error);
      this.error = 'Donation failed';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Share campaign
   */
  shareCampaign(campaign: any): void {
    const shareData = {
      title: campaign.title,
      text: campaign.description,
      url: `${window.location.origin}/fundraising/${campaign.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareData.url);
      this.successMessage = 'Campaign link copied to clipboard!';
    }
  }

  /**
   * Toggle create form visibility
   */
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.campaignForm.reset();
      this.error = '';
      this.successMessage = '';
    }
  }

  /**
   * Calculate campaign progress
   */
  calculateProgress(campaign: Campaign): number {
    return Math.min((campaign.currentAmount / campaign.goal) * 100, 100);
  }

  /**
   * Check if campaign is active
   */
  isCampaignActive(campaign: Campaign): boolean {
    return new Date(campaign.endDate) > new Date();
  }

  onSubmit(): void {
    if (this.campaignForm.valid) {
      this.createCampaignWithValidation();
    }
  }
}



