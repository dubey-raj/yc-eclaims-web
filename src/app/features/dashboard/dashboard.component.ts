import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  managerName = 'Raj Dubey';

  kpis = [
    { title: 'Total Claims', value: 342 },
    { title: 'In Review', value: 58 },
    { title: 'Approved', value: 210 },
    { title: 'Rejected', value: 74 }
  ];

  claimStatuses = ['Submitted', 'Under Review', 'Approved', 'Rejected'];

  filters = {
    status: '',
    date: '',
    search: ''
  };

  claims = [
    { claimId: 'CLM001', policyNumber: 'POL123', customerName: 'R. Dubey', status: 'Under Review', inspector: 'John D.' },
    { claimId: 'CLM002', policyNumber: 'POL124', customerName: 'A. Mehra', status: 'Approved', inspector: 'N/A' },
    { claimId: 'CLM003', policyNumber: 'POL125', customerName: 'S. Roy', status: 'Submitted', inspector: 'Tina S.' },
  ];

  get filteredClaims() {
    return this.claims.filter(claim => {
      const statusMatch = !this.filters.status || claim.status === this.filters.status;
      const searchMatch = !this.filters.search || claim.claimId.includes(this.filters.search);
      return statusMatch && searchMatch;
    });
  }

  inspectors = [
    { name: 'John Doe', assigned: 12, avgTime: '2.3 days', available: true },
    { name: 'Aarti Verma', assigned: 7, avgTime: '1.5 days', available: false }
  ];

  recentActivities = [
    { message: '✔️ Claim CLM057 approved by Officer Sharma', date: '04-Jul' },
    { message: '❌ Claim CLM052 rejected due to policy mismatch', date: '03-Jul' },
    { message: '📄 Claim CLM049 reviewed by Inspector John', date: '03-Jul' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
