import { Component } from '@angular/core';
import { LeftSidebarComponent } from '../../../../shared/left-sidebar/left-sidebar.component';
import { MainDashboardComponent } from '../../../../dashboard/main/main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-pending-activities',
  standalone: true,
  imports: [LeftSidebarComponent, MainDashboardComponent],
  templateUrl: './pending-activities.component.html',
  styleUrl: './pending-activities.component.css',
})
export class PendingActivitiesComponent { }
