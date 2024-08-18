import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, OnInit, Inject } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { NotifierComponent } from '../../notifier/notifier/notifier.component';
import { CurrentTimeComponent } from '../../current_time/current-time/current-time.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { Activity, Ticket } from '../../../models/Ticket';
import { users } from '../../../dummy-data/user';
import guards_enrolled from '../../../dummy-data/guards_enrolled';
import { services_available } from '../../../dummy-data/services_available';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { roles } from '../../../models/Ticket';
import { CreateUserService } from '../../../services/api-calls/create-user.service';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [
    RouterOutlet,
    NotifierComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ButtonComponent,
    FormsModule,
    CurrentTimeComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  currentTime: string | undefined;
  sessionService: any;
  isLoadingRequest: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private createUserService: CreateUserService,
    private sessionStorageService: SessionStorageService
  ) {}
  @Input() FormTitle = '';
  @Input() FormInputs: any = [];
  @Input() isGuardAuth: string = 'false';
  @Input() isAdminAuth: string = 'false';
  @Input() isAddingNewUser: boolean = false;
  @Input() isAuthenticatingUser: boolean = false;
  @Input() selectedGuardId: string = '';
  @Input() selectedServiceId: string = '';
  selectedRole: string = '';
  selectedRoleId: string = '';
  hidden: boolean = true;

  @Output() selectionSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() serviceSelected: EventEmitter<number> = new EventEmitter<number>();

  title = 'app-form-component';
  private intervalId: any;
  notificationMessage: string | null = null;
  notificationType: string = 'error';
  $event!: Event;
  has_valid_selected: boolean = false;
  @ViewChild('mobileNumber') mobileNumberInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ref_by') referredByInput!: ElementRef<HTMLInputElement>;

  @ViewChild('name') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('email_address') emailAddressInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('user_role') roleInput!: ElementRef<HTMLSelectElement>;
  @ViewChild('teller_counter_name') teller_counter_nameInput!: ElementRef<HTMLInputElement>;

  roles = roles;
  path: string = '';

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    
    this.activatedRoute.url.subscribe(urlSegments => {
      this.path = urlSegments.map(segment => segment.path).join('/');
      this.modifyArrayBasedOnPath();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  createTicket(event: Event, argument: string): void {
    event.preventDefault();
    let ticket: Ticket = {
      id: 0,
      by_user: 0,
      start_time: new Date(),
      end_time: new Date(),
      total_waiting_time: 0,
      number_of_activities: 0,
      served_by: 0,
      created_by: 0
    }
    let activity: Activity = {
      id: 0,
      by_ticket: 0,
      next_station: 0,
      is_waiting: false,
      completed: false,
      cancelled: false,
      status: '',
      created_on: new Date(),
      closed_on: new Date()
    }
    const mobileNumber = this.mobileNumberInput.nativeElement.value;
    const referredBy = this.referredByInput.nativeElement.value;
    if ((!mobileNumber || !this.selectedServiceId) || (mobileNumber === '' || this.selectedServiceId === '')) {
      return this.showNotification('Invalid inputs', 'error');
    }
    this.showNotification('Ticket created...', 'success');
    localStorage.setItem('has_valid_ticket', 'true');
    ticket = {
      ...ticket,
      id: 1,
      by_user: users.find((user) => user.mobile_number === mobileNumber)?.id || 0,
      created_by: guards_enrolled.find((guard) => guard.id === parseInt(this.selectedGuardId, 10))?.id || 0
    };
    activity = {
      ...activity,
      id: 1,
      by_ticket: ticket.id,
      next_station: this.services_available.find((service) => service.id === parseInt(this.selectedServiceId, 10))?.id || 0,
      is_waiting: true,
      status: 'PENDING'
    };

    // simulate backend POST
    localStorage.setItem('ticket_details', JSON.stringify(ticket));
    localStorage.setItem(`new_activity_details`, JSON.stringify(activity));

    // delay success for sake of toastr (notifer) - not needed, may remove
    setTimeout(() => {
      this.router.navigate(['/ticket_create/success']);
    }, 500);
  }
  authenticateAdmin(event: Event, argument: string): void {
    const email_address = this.emailAddressInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    if ((!email_address || !password) || (email_address === '' || password === '')) {
      return this.showNotification('Invalid credentials', 'error');
    }
    // simulate backend POST
    this.showNotification('Authenticated, logging in', 'success')
  }

  addUser(event: Event) {
    event.preventDefault();
    this.isLoadingRequest = true;
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      name: this.nameInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
      role: this.selectedRole,
    };
    this.createUserService.createUser(payload)
    .subscribe({
      next: (data: any) => {
        this.isLoadingRequest = false;
        if(data.error_invalid_input) this.showNotification('Invalid Input', 'error');  
        if(!data) this.showNotification('Email exists', 'error'); 
        if(data.id) {
          this.showNotification('Created Successfully', 'success');
          this.router.navigate(['/hr'])
        }
      }
    });
  }

  authUser(event: Event) {
    event.preventDefault();
    this.isLoadingRequest = true;
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value
    };
    this.createUserService.loginUser(payload)
    .subscribe({
      next: (data: any) => {
        this.isLoadingRequest = false;
        if(data.error_invalid_input) this.showNotification('Invalid Input', 'error');  
        if(!data) this.showNotification('User does not exist', 'error'); 
        if(data.jwt) {
          this.showNotification('Authenticated Successfully', 'success');
          // localStorage.setItem('user_token', data.jwt);
          this.sessionStorageService.startSession(data.jwt);
          this.router.navigate(['/hr'])
        }
      }
    });
  }

  startGuardSession(event: Event, argument: string): void {
    event.preventDefault();
    if (!this.has_valid_selected) {
      return this.showNotification('Invalid guard ID', 'error')
    }
    localStorage.setItem('authorized_guard', this.selectedGuardId);
    this.router.navigate(['/']);
  }
  onRoleChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    this.selectionSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedRoleId = event.value;
    this.selectedRole = roles.find((role) => role.id === parseInt(this.selectedRoleId, 10))?.title || '';
    console.log('selected role: ', this.selectedRole);
  }
  onGuardChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    console.log({ selectedId })
    this.selectionSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedGuardId = event.value;
  }
  onServiceChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    this.serviceSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedServiceId = event.value;
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }

  // simulate services from backend
  services_available = services_available;

  endSession() {
    this.sessionService.endSession();

    // refresh the page
    window.location.reload();
  }
  modifyArrayBasedOnPath() {
    if (this.path !== 'create-teller') {
      this.roles.splice(0, 1);
    }
  }
}
