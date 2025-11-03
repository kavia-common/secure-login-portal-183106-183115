import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: 'Dashboard' },
  { path: '**', redirectTo: 'login' }
];
