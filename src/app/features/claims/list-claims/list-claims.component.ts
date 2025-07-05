import { Component } from '@angular/core';
import { Claim } from '../../../core/models/claim';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../../core/services/claim.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_ENTRIES } from '../../../core/constants/appConstants';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ModalService } from '../../../core/services/modal.service';
import { ViewClaimComponent } from '../view-claim/view-claim.component';
import { AssesmentComponent } from '../assess-claim/assesment.component';

@Component({
  selector: 'app-list-claims',
  standalone: true,
  imports: [CommonModule],
  providers: [ClaimService],
  templateUrl: './list-claims.component.html',
  styleUrl: './list-claims.component.scss'
})
export class ListClaimsComponent {

  claims: Claim[] = [];
  selectedClaim: Claim | null = null;

  constructor(private router:Router, private claimService: ClaimService,
    private localStorageService: LocalStorageService, private modalService: ModalService){}

  async ngOnInit(): Promise<void> {
    await this.loadClaims();
    this.modalService.modalComponent$.subscribe(component => {
      if(component == null){
        this.loadClaims();
      }
    });
  }

  private async loadClaims() {
    await firstValueFrom(this.claimService.getClaims()).then((claimResult) => {
      this.claims = claimResult.claims;
    });
  }

  openClaimDetails(claim: Claim): void {
    this.localStorageService.setValue(LOCAL_STORAGE_ENTRIES.storedClaimNumber, claim.claimNumber);
    this.modalService.open(ViewClaimComponent, 'View Claim');
  }
}
