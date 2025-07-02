import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PolicyService } from '../../../core/services/policy.service';
import { firstValueFrom } from 'rxjs';
import { ClaimService } from '../../../core/services/claim.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [PolicyService, ClaimService, AuthService, NotificationService],
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.scss'
})
export class AddClaimComponent {
  eclaimForm!: FormGroup;
  maxDate: string;
  userPolicies: any[] = [{ policyNumber: "POL2025001987" }, { policyNumber: "POL2025001988" }, { policyNumber: "POL2025001989" }]; // You should populate this from backend
  selectedPolicyId: string = '';
  selectedVehicleId: string = '';
  selectedFiles: File[] = [];
  reviewFileNames: SafeResourceUrl[] = [];
  previewUrl: SafeResourceUrl | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private policyService: PolicyService, private claimService: ClaimService,
    private notificationService: NotificationService) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.eclaimForm = this.fb.group({
      claimantName: [user?.firstName + ' ' + user?.lastName],
      claimantEmail: [user?.email],
      claimantPhone: [user?.phoneNumber],

      // Policy-related fields
      policyNumber: ['', Validators.required],
      policyAmount: [''],
      coverageType: [''],
      policyStartDate: [''],
      policyEndDate: [''],

      // Vehicle-related fields
      vehicleNumber: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleYear: ['', [Validators.required, Validators.min(1900)]],

      // Incident details
      incidentDate: ['', Validators.required],
      incidentLocation: ['', Validators.required],
      incidentDescription: ['', Validators.required],
      supportingFiles: [null],
      termsCheck: [false, Validators.requiredTrue],
    });
  }

  async onPolicyChange(event: Event): Promise<void> {
    this.selectedPolicyId = (event.target as HTMLSelectElement).value;
    await firstValueFrom(this.policyService.loadPolicyDetails(this.selectedPolicyId)).then((policy) => {
      if (policy) {
        this.selectedVehicleId = policy.vehicles[0].id;
        this.eclaimForm.patchValue({
          coverageType: policy.policyType,
          policyAmount: policy.coverageAmount,
          policyStartDate: policy.effectiveDate,
          policyEndDate: policy.expiryDate,
          vehicleNumber: policy.vehicles[0].registrationNumber,
          vehicleModel: policy.vehicles[0].make + ' ' + policy.vehicles[0].model,
          vehicleYear: policy.vehicles[0].year
        });
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.previewUrl = null;
    }
  }

  previewFile(index: number, event: Event): void {
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
    if (this.eclaimForm.valid && this.selectedFiles.length > 0) {
      const formValue = this.eclaimForm.value;

      const formData = new FormData();
      formData.append('policyNumber', this.selectedPolicyId);
      formData.append('incidentDate', formValue.incidentDate);
      formData.append('incidentLocation', formValue.incidentLocation);
      formData.append('incidentDescription', formValue.incidentDescription);

      // Add each file to FormData
      this.selectedFiles.forEach(file => {
        formData.append('supportingFiles', file); // key must match DTO property
      });

      try {
        await firstValueFrom(this.claimService.addNewClaim(formData)).then((res) => {
          this.notificationService.showSuccess(`Claim submitted successfully! Claim number: ${res.claimNumber}`);
        });
      } catch (error) {
        this.notificationService.showSuccess("Failed to submit claim");
        console.error('Failed to submit claim', error);
      }
    } else {
      this.eclaimForm.markAllAsTouched();
    }
  }
}
