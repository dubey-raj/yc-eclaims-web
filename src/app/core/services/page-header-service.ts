import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, map } from "rxjs";
import { PageHeader } from "../models/pg-header";

@Injectable({ providedIn: 'root' })
export class PageHeaderService {
  private pgHeaderSubject = new BehaviorSubject<PageHeader>({ breadcrumbs: [], title: "" });
  pgheader$ = this.pgHeaderSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getPageTitle();
        const breadcrumbs = this.buildBreadcrumbs(this.route.root);
        this.pgHeaderSubject.next({ breadcrumbs: breadcrumbs, title: title });
      });
  }

  private getPageTitle(): any {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'];
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    const children = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
        const label = child.snapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.push({ label, url });
        }
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}