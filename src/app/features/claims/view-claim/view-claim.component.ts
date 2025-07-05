import { Component } from '@angular/core';
import { ClaimService } from '../../../core/services/claim.service';
import { Claim } from '../../../core/models/claim';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LOCAL_STORAGE_ENTRIES } from '../../../core/constants/appConstants';

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

  constructor(private claimService: ClaimService,
    private localStorageService: LocalStorageService
  ) { }

  async ngOnInit() {
    //this.claimNumber = this.route.snapshot.paramMap.get('claimNumber') || '';
    this.claimNumber = this.localStorageService.getValueByKey(LOCAL_STORAGE_ENTRIES.storedClaimNumber) ?? '';
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
