import { Component } from '@angular/core';
import { Claim } from '../../../core/models/claim';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-claims.component.html',
  styleUrl: './list-claims.component.scss'
})
export class ListClaimsComponent {
  claims: Claim[] = [];

  ngOnInit(): void {
    // Simulated data – replace with real service call
    this.claims = [
      { id: 'CLM-1001', status: 'Under Review', submittedDate: '2025-06-15', vehicleNumber: 'MH12AB1234' },
      { id: 'CLM-1002', status: 'Approved', submittedDate: '2025-06-10', vehicleNumber: 'MH14CD5678', amount: 1220 },
      { id: 'CLM-1003', status: 'Rejected', submittedDate: '2025-06-01', vehicleNumber: 'DL8CAF4321' }
    ];
  }
}
