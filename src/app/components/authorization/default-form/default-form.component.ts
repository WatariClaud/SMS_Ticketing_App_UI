import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HasBgImageComponent } from '../../has-bg-image/has-bg-image/has-bg-image.component';
import { FormComponent } from '../form/form.component';
import { ButtonComponent } from '../button/button.component';
import { CreateTicketService } from '../../../services/api-calls/create-ticket.service';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-default-form',
  standalone: true,
  imports: [HasBgImageComponent, FormComponent, ButtonComponent, ButtonModule],
  templateUrl: './default-form.component.html',
  styleUrl: './default-form.component.css',
})
export class DefaultFormComponent implements OnInit {
  selectedServiceId: string = '';
  is_engineer_route: boolean = false;
  ref_no: string = '';

  constructor(
    private router: Router,
    private createTicketService: CreateTicketService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService
  ) {
    this.is_engineer_route = this.router.url.includes('/engineer');
  }

  onServiceSelected(serviceId: number): void {
    this.selectedServiceId = serviceId.toString();
  }
  endSession(): void {
    this.sessionStorageService.clearAllSessions();
    // refresh page
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.createTicketService
      .create_ref_no(this.authService.getUserToken() ?? '')
      .subscribe({
        next: (data) => {
          console.log({ data });
          this.ref_no = data.RefNo;
          // console.clear();
          // using local store to save time, may create service later
          localStorage.setItem('ticket_ref_number', this.ref_no);
        },
      });
  }
}
