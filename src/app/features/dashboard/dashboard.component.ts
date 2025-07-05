import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClaimService } from '../../core/services/claim.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { firstValueFrom } from 'rxjs';
import { DashboardData } from '../../core/models/dasboard';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData!: DashboardData;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  async fetchDashboardData(): Promise<void> {
    await firstValueFrom(this.dashboardService.getDashboardData()).then((data) =>{
      this.dashboardData= data;
    });
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Under Review': return 'badge-light-warning';
      case 'Reviewed': return 'badge-light-success';
      case 'Escalated': return 'badge-light-danger';
      default: return 'badge-light-secondary';
    }
  }
}