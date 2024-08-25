import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../authorization/form/form.component';
import { LeftSidebarComponent } from '../../dashboard/left-sidebar/left-sidebar/left-sidebar.component';
import { MainDashboardComponent } from '../../dashboard/main/main-dashboard/main-dashboard.component';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { verifyToken } from '../../../globals/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teller',
  standalone: true,
  imports: [FormComponent, LeftSidebarComponent, MainDashboardComponent],
  templateUrl: './teller.component.html',
  styleUrl: './teller.component.css',
})
export class TellerComponent implements OnInit {
  //
  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}
  ngOnInit(): void {
    const hrId = this.sessionStorageService.getHelpDeskToken() || '';
    const isValidToken = verifyToken(hrId);
    const url = window.location.pathname;

    const isAuthRoute = url === '/hr/login';
    console.log({ isValidToken, isAuthRoute });

    if (!isValidToken) {
      if (isAuthRoute) {
        this.router.navigate(['/hr']);
      } else {
        this.router.navigate(['/hr/login']);
      }
    }
  }
}
