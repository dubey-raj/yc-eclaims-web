import { Component } from '@angular/core';
import { ClaimService } from '../../../core/services/claim.service';
import { Claim } from '../../../core/models/claim';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-claim',
  standalone: true,
  imports:[CommonModule],
  providers: [ClaimService],
  templateUrl: './view-claim.component.html',
  styleUrl: './view-claim.component.scss'
})
export class ViewClaimComponent {

  claim: Claim | null = null;
  claimNumber: string ='';

  constructor(private route: ActivatedRoute, private claimService: ClaimService) { }

  async ngOnInit() {
    this.claimNumber = this.route.snapshot.paramMap.get('claimNumber') || '';
    await this.loadClaim();
  }

  async loadClaim(){
   await firstValueFrom(this.claimService.getClaim(this.claimNumber)).then((clm) => {
      if (clm) {
        this.claim = clm;
      }
    });
  }
}
