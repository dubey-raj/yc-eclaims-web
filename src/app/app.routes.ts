import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { LayoutComponent } from './features/layout/layout.component';
import { AddClaimComponent } from './features/claims/add-claim/add-claim.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    {
        path: 'claims', component: LayoutComponent,
        children: [
            { path: 'add-claim', component: AddClaimComponent }
        ]
    }
];
