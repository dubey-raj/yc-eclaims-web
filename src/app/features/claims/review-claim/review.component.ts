import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { ClaimService } from '../../../core/services/claim.service';
import { Claim } from '../../../core/models/claim';
import { SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LOCAL_STORAGE_ENTRIES } from '../../../core/constants/appConstants';
import { firstValueFrom } from 'rxjs';
import { ClaimAssessmentService } from '../../../core/services/claim-assessment.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ClaimService, NotificationService],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  claim: Claim | null = null;
  claimNumber: string = '';
  claimReviewForm!: FormGroup;

  constructor(private fb: FormBuilder, private claimService: ClaimService, private claimAssessmentService: ClaimAssessmentService,
    private localStorageService: LocalStorageService, private notificationService: NotificationService
  ) {
    this.claimReviewForm = this.fb.group({
      reviewNotes: ['', [Validators.required, Validators.minLength(10)]],
      claimStatus: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.claimNumber = this.localStorageService.getValueByKey(LOCAL_STORAGE_ENTRIES.storedClaimNumber) ?? '';
    await this.loadClaim();
  }

  async loadClaim() {
    await firstValueFrom(this.claimService.getClaim(this.claimNumber)).then((clm) => {
      if (clm) {
        this.claim = clm;
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.claimReviewForm.valid) {
      const formValue = this.claimReviewForm.value;
      const formData = new FormData();
      const claimNumber = this.localStorageService.getValueByKey(LOCAL_STORAGE_ENTRIES.storedClaimNumber) ?? '';
      formData.append('claimNumber', claimNumber);
      formData.append('claimStatus', formValue.claimStatus);
      formData.append('notes', formValue.reviewNotes);

      try {
        await firstValueFrom(this.claimAssessmentService.reviewClaim(formData)).then((res) => {
          this.notificationService.showSuccess(`Claim Reviewed successfully!`);
        });
      } catch (error) {
        this.notificationService.showError("Failed to review claim");
      }
    } else {
      this.claimReviewForm.markAllAsTouched();
    }
  }
}
