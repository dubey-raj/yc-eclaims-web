import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from '../../shared/app-nav/app-nav.component';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import { AppBreadcrumbComponent } from '../../shared/app-breadcrumb/app-breadcrumb.component';
import { AuthService } from '../../core/services/auth.service';
import { AccountService } from '../../core/services/account.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AppNavComponent, AppHeaderComponent, AppBreadcrumbComponent],
  providers:[AuthService, AccountService, NotificationService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
