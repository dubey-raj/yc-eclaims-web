import { Component } from '@angular/core';
import { PageHeaderService } from '../../core/services/page-header-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../core/models/pg-header';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './app-breadcrumb.component.html',
  styleUrl: './app-breadcrumb.component.scss'
})
export class AppBreadcrumbComponent {
  public pgHeader: PageHeader={};

  constructor(private pageHeaderService: PageHeaderService) {}

  ngOnInit(): void {
    this.pageHeaderService.pgheader$.subscribe(pg => {
      this.pgHeader = pg
    });
  }
}
