import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from './shared/app-nav/app-nav.component';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AppBreadcrumbComponent } from './shared/app-breadcrumb/app-breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yc-eclaims-web';
}
