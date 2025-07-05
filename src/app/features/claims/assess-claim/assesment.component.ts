import { Component } from '@angular/core';
import { ClaimService } from '../../../core/services/claim.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Claim } from '../../../core/models/claim';
import { LOCAL_STORAGE_ENTRIES } from '../../../core/constants/appConstants';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from '../../../core/services/notification.service';
import { ClaimAssessmentService } from '../../../core/services/claim-assessment.service';

@Component({
  selector: 'app-assesment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ClaimService, NotificationService],
  templateUrl: './assesment.component.html',
  styleUrl: './assesment.component.scss'
})

export class AssesmentComponent {
  claim: Claim | null = null;
  claimNumber: string = '';
  maxDate: string;
  claimAssessmentForm!: FormGroup;
  selectedFiles: File[] = [];
  reviewFileNames: SafeResourceUrl[] = [];
  previewUrl: SafeResourceUrl | null = null;

  constructor(private fb: FormBuilder, private claimService: ClaimService, private claimAssessmentService: ClaimAssessmentService,
    private localStorageService: LocalStorageService, private notificationService: NotificationService
  ) {
    this.claimAssessmentForm = this.fb.group({
      inspectionDate: ['', Validators.required],
      assessmentNotes: ['', [Validators.required, Validators.minLength(10)]],
      damageEstimate: [0, [Validators.required, Validators.min(0)]],
      claimStatus: ['', Validators.required]
    });
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  async ngOnInit() {
    //this.claimNumber = this.route.snapshot.paramMap.get('claimNumber') || '';
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

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.previewUrl = null;
    }
  }

  previewAssessmentFile(index: number, event: Event): void {
    event.preventDefault();
    const file = this.selectedFiles[index];
    const reader = new FileReader();

    reader.onload = () => {
      const fileUrl = reader.result as string;
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <iframe src="${fileUrl}" width="100%" height="100%" frameborder="0"></iframe>
        `);
        newTab.document.title = file.name;
      } else {
        alert("Popup blocked. Please allow popups for this site.");
      }
    };

    reader.readAsDataURL(file);
  }

  async onSubmit(): Promise<void> {
    if (this.claimAssessmentForm.valid && this.selectedFiles.length > 0) {
      const formValue = this.claimAssessmentForm.value;
      console.log(formValue);
      const formData = new FormData();
      const claimNumber = this.localStorageService.getValueByKey(LOCAL_STORAGE_ENTRIES.storedClaimNumber) ?? '';
      formData.append('claimNumber', claimNumber);
      formData.append('inspectionDate', formValue.inspectionDate);
      formData.append('claimStatus', formValue.claimStatus);
      formData.append('damageEstimate', formValue.damageEstimate);
      formData.append('notes', formValue.assessmentNotes);

      // Add each file to FormData
      this.selectedFiles.forEach(file => {
        formData.append('supportingFiles', file); // key must match DTO property
      });

      try {
        await firstValueFrom(this.claimAssessmentService.assessClaim(formData)).then((res) => {
          this.notificationService.showSuccess(`Claim Assessed successfully! Claim number: ${res.claimNumber}`);
        });
      } catch (error) {
        this.notificationService.showError("Failed to assess claim");
        console.error('Failed to assess claim', error);
      }
    } else {
      this.claimAssessmentForm.markAllAsTouched();
    }
  }
}
