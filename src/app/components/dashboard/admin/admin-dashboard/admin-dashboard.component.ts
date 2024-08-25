import { Component } from '@angular/core';
import { LeftSidebarComponent } from '../../../dashboard/left-sidebar/left-sidebar/left-sidebar.component';
import { MainDashboardComponent } from '../../../dashboard/main/main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [LeftSidebarComponent, MainDashboardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
