import { Component } from '@angular/core';
import { NavItem } from '../../core/models/nav-item';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/User';
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
          { label: 'Submit New Claim', icon: 'feather icon-edit', path: '/claims/add-claim' },
          { label: 'My Claims', icon: 'feather icon-list', path: '/claims/my-claims' },
          { label: 'Claim Status', icon: 'feather icon-activity', path: '/claims/claim-status' },
          { label: 'Logout', icon: 'feather icon-log-out m-r-5', path: '/logout' },
        ];
        break;

      case 'inspector':
        this.navItems = [
          { label: 'Assigned Claims', icon: 'feather icon-briefcase', path: '/assigned-claims' },
          { label: 'Submit Assessment', icon: 'feather icon-file-plus', path: '/submit-assessment' },
          { label: 'My Assessments', icon: 'feather icon-check-circle', path: '/completed-assessments' },
          { label: 'Logout', icon: 'feather icon-log-out m-r-5', path: '/logout' }
        ];
        break;

      case 'officer':
        this.navItems = [
          { label: 'Review Claims', icon: 'feather icon-inbox', path: '/review-queue' },
          { label: 'All Claims', icon: 'feather icon-database', path: '/all-claims' },
          { label: 'User Management', icon: 'feather icon-users', path: '/users' },
          { label: 'Logout', icon: 'feather icon-log-out m-r-5', path: '/logout' }
        ];
        break;
    }
  }

}
