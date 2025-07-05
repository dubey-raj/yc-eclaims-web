import { Component } from '@angular/core';
import { NavItem } from '../../core/models/nav-item';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.scss',
  imports: [RouterLink, CommonModule]
})
export class AppNavComponent {
  user: User|null = null;
  navItems: NavItem[] = [];

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    const userRole = this.authService.userRole.toLowerCase();
    
    switch (userRole) {
      case 'customer':
        this.navItems = [
          { label: 'My Claims', icon: 'feather icon-list', path: '/claims/my-claims' },
          { label: 'Submit New Claim', icon: 'feather icon-edit', path: '/claims/add-claim' },
          //{ label: 'Claim Status', icon: 'feather icon-activity', path: '/claims/claim-status' }
        ];
        break;

      case 'inspector':
        this.navItems = [
          { label: 'Assess Claims', icon: 'feather icon-briefcase', path: '/claims/assigned-claims' },
          { label: 'My Assessments', icon: 'feather icon-check-circle', path: '/claims/completed-assessments' }
        ];
        break;

      case 'manager':
        this.navItems = [
          { label: 'Dashboard', icon: 'feather icon-home', path: '/claims/dashboard' },
          { label: 'Review Claims', icon: 'feather icon-briefcase', path: '/claims/assigned-claims' }
        ];
        break;
    }
  }

}
