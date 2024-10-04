import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SessionStorageService } from '../../../../services/session/session-storage.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  constructor(
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }
  userType: string | null = null;

  ngOnInit(): void {
    // Access route parameters
    this.route.url.subscribe((segments) => {
      if (segments.length > 0) {
        this.userType = segments[0].path; // e.g., 'hr' or 'admin'
        console.log(this.userType);
        if (this.userType === 'hr') {
          this.sessionStorageService.endSession('Teller');
          window.location.replace('/login-user');
        } else if (this.userType === 'admin') {
          this.sessionStorageService.endSession('Admin');
          window.location.replace('/admin');
        }
      }
    });
  }
}
