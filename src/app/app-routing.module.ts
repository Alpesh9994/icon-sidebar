import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SupportComponent } from './pages/support/support.component';
import { RoleComponent } from './pages/role/role.component';
import { ErrorLogsComponent } from './pages/error-logs/error-logs.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userview', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'role', component: RoleComponent },
  { path: 'errorlogs', component: ErrorLogsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
