import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { LayoutComponent } from './features/layout/layout.component';
import { AddClaimComponent } from './features/claims/add-claim/add-claim.component';
import { AssesmentComponent } from './features/claims/assesment/assesment.component';
import { ReviewComponent } from './features/claims/review/review.component';
import { ListClaimsComponent } from './features/claims/list-claims/list-claims.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    {
        path: 'claims', component: LayoutComponent,
        children: [
            { path: 'add-claim', component: AddClaimComponent, data: { title: "New Claim", breadcrumb: "Add Claim" } },
            { path: 'my-claims', component: ListClaimsComponent, data: { title: "My Claims", breadcrumb: "My Claims" } },
            { path: 'assess-claim', component: AssesmentComponent, data: { title: "Claim Assessment", breadcrumb: "Claim Assessment" } },
            { path: 'review-claim', component: ReviewComponent, data: { title: "Review Claim", breadcrumb: "Review Claim" } }
        ]
    }
];
