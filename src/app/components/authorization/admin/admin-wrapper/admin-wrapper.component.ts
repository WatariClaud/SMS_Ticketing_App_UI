import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { verifyToken } from '../../../../globals/functions';
import { SessionStorageService } from '../../../../services/session/session-storage.service';
import { AdminAuthComponent } from '../admin-auth/admin-auth.component';
import { AdminDashboardComponent } from '../../../dashboard/admin/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-wrapper',
  standalone: true,
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.css',
  imports: [AdminAuthComponent, AdminDashboardComponent],
})
export class AdminWrapperComponent {
  isAdminLoggedIn: boolean;

  constructor(private sessionStorageService: SessionStorageService) {
    const token = this.sessionStorageService.getAdminToken() || null;
    console.clear();
    console.log(token ? true : false);
    this.isAdminLoggedIn = token ? true : false;
  }
}
