import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import components
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
