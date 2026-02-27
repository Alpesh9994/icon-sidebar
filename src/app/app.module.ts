import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SupportComponent } from './pages/support/support.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RoleComponent } from './pages/role/role.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { ErrorLogsComponent } from './pages/error-logs/error-logs.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { IonicModule } from '@ionic/angular';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { DynamicAppsMenuComponent } from './shared/components/dynamic-apps-menu/dynamic-apps-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { AnalyzerDashboardComponent } from './pages/analyzer-dashboard/analyzer-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ReportsComponent,
    SettingsComponent,
    SupportComponent,
    RoleComponent,
    FooterComponent,
    ErrorLogsComponent,
    BreadcrumbComponent,
    DynamicAppsMenuComponent,
    AnalyzerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    IonicModule.forRoot(),
    MatSelectModule
  ],
  providers: [],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
