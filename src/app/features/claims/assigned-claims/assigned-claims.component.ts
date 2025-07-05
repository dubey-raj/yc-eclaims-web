import { Component } from '@angular/core';
import { Claim } from '../../../core/models/claim';
import { ClaimService } from '../../../core/services/claim.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LOCAL_STORAGE_ENTRIES } from '../../../core/constants/appConstants';
import { AssesmentComponent } from '../assess-claim/assesment.component';
import { AuthService } from '../../../core/services/auth.service';
import { ReviewComponent } from '../review-claim/review.component';

@Component({
  selector: 'app-assigned-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-claims.component.html',
  styleUrl: './assigned-claims.component.scss'
})

export class AssignedClaimsComponent {

  claims: Claim[] = [];
  userRole: string = '';
  constructor(private router: Router, private claimService: ClaimService, private modalService: ModalService,
    private localStorageService: LocalStorageService, private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userRole = this.authService.userRole;
    await this.loadClaims();
    this.modalService.modalComponent$.subscribe(async component => {
      if(component == null){
        await this.loadClaims();
      }
    });
  }

  private async loadClaims() {
    await firstValueFrom(this.claimService.getAssignedClaims()).then((claimResult) => {
      this.claims = claimResult.claims;
    });
  }

  openClaimDetails(claim: Claim): void {
    this.localStorageService.setValue(LOCAL_STORAGE_ENTRIES.storedClaimNumber, claim.claimNumber);
    if(this.userRole == 'Inspector'){
      this.modalService.open(AssesmentComponent, 'Claim Assessment');
    }
    else if(this.userRole == 'Manager'){
      this.modalService.open(ReviewComponent, 'Claim Review');
    }
  }
}
