import { Component } from '@angular/core';
import { Claim } from '../../../core/models/claim';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../../core/services/claim.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router:Router, private claimService: ClaimService){}

  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.claimService.getClaims()).then((claimResult) =>{
      this.claims = claimResult.claims;
    });
  }

  openClaimDetails(claim: Claim): void {
    this.router.navigate(['/claims/view-claim', claim.claimNumber]);
  }
}
