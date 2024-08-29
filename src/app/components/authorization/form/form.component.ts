import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
  Inject,
} from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { NotifierComponent } from '../../notifier/notifier/notifier.component';
import { CurrentTimeComponent } from '../../current_time/current-time/current-time.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../button/button.component';
import { FormsModule, FormControl } from '@angular/forms';
import { Activity, Ticket } from '../../../models/Ticket';
import { users } from '../../../dummy-data/user';
import guards_enrolled from '../../../dummy-data/guards_enrolled';
import { services_available } from '../../../dummy-data/services_available';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { roles } from '../../../models/Ticket';
import { CreateUserService } from '../../../services/api-calls/create-user.service';
import { CreateTicketService } from '../../../services/api-calls/create-ticket.service';
import { GetUserService } from '../../../services/api-calls/get-user.service';
import { GetActivityService } from '../../../services/api-calls/get-activity.service';
import { CardModule } from 'primeng/card';
import { ToastService } from '../../../services/toast/toast.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [
    RouterOutlet,
    NotifierComponent,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ButtonComponent,
    FormsModule,
    CurrentTimeComponent,
    CardModule,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  currentTime: string | undefined;
  sessionService: any;
  isLoadingRequest: boolean = false;
  helpdesk_managers: any[] = [];
  services: string[] = ['Service 1', 'Service 2', 'Service 3'];
  selectedServices: string[] = [];
  serviceControl = new FormControl();

  changeUserTypes: MenuItem[] = [
    {
      label: 'Admin',
      command: () => {
        this.router.navigate(['/admin']);
      },
    },
    {
      label: 'Teller',
      command: () => {
        this.router.navigate(['/hr']);
      },
    },
    {
      label: 'Security',
      command: () => {
        this.router.navigate(['/']);
      }
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private createUserService: CreateUserService,
    private getUserService: GetUserService,
    private sessionStorageService: SessionStorageService,
    private createTicketService: CreateTicketService,
    private getActivityService: GetActivityService,
    private toastService: ToastService
  ) { }
  @Input() FormTitle = '';
  @Input() FormInputs: any = [];
  @Input() isGuardAuth: string = 'false';
  @Input() isAdminAuth: string = 'false';
  @Input() isAddingNewUser: boolean = false;
  @Input() isAddingNewStation: boolean = false;
  @Input() isAuthenticatingUser: boolean = false;
  @Input() selectedGuardId: string = '';
  @Input() selectedServiceId: string = '';
  @Input() isHelpDeskAuth: string = '';
  selectedRole: string = '';
  selectedRoleId: string = '';
  hidden: boolean = true;
  selectedService_id: string[] = [''];

  @Output() selectionSelected: EventEmitter<number> =
    new EventEmitter<number>();
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
  @ViewChild('managed_by') managedByInput!: ElementRef<HTMLInputElement>;
  @ViewChild('teller_counter_name')
  teller_counter_nameInput!: ElementRef<HTMLSelectElement>;

  roles = roles;
  path: string = '';
  token: string = '';

  // simulate services from backend
  services_available: any[] = JSON.parse(
    localStorage.getItem('services_available') || '[]'
  );

  ngOnInit(): void {
    this.updateTime();
    this.createTicketService.create_ref_no(this.token).subscribe({
      next: (data) => {
        console.log('ticket_ref_number -> ', data);
        localStorage.setItem('ticket_ref_number', data.ref_no);
      },
    });
    this.serviceControl.valueChanges.subscribe((selectedValues) => {
      this.selectedServices = selectedValues || [];
    });
    console.log(this.selectedServices);
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    console.log(this.isGuardAuth);

    this.activatedRoute.url.subscribe((urlSegments) => {
      this.path = urlSegments.map((segment) => segment.path).join('/');
      // this.modifyArrayBasedOnPath();
    });

    this.token =
      this.sessionStorageService.getHelpDeskToken() ||
      this.sessionStorageService.getAdminToken() ||
      this.sessionStorageService.getGuardOnDuty() ||
      '';

    this.getUserService.getUsers(this.token).subscribe({
      next: (data) => {
        // console.clear();
        console.log({ helpdesk_managers: data });
        // if (!data || (data && data.length === 0)) {
        //   this.router.navigate(['/create-user']);
        // }
        if (data && data.length > 0) {
          data = data.filter(
            (user: { role: string }) => user.role === 'Teller'
          );
          this.helpdesk_managers = data;
        }
      },
    });

    this.createTicketService.get_desks(this.token).subscribe({
      next: (data) => {
        // console.clear();
        console.log({ desks: data });
        if (data && data.length > 0) {
          this.services_available = data;
          localStorage.setItem(
            'services_available',
            JSON.stringify(this.services_available)
          );
        }
      },
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
      customer_name: this.nameInput.nativeElement.value,
      phone_number: this.mobileNumberInput.nativeElement.value,
      station:
        this.services_available.find(
          (desk) => desk.id === parseInt(this.selectedServiceId, 10)
        )?.name || '',
      start_time: new Date(),
      end_time: null,
      total_waiting_time: 0,
      number_of_activities: 0,
      served_by: 0,
      created_by: JSON.parse(localStorage.getItem('guard_data') || '{}').email,
      reference_number: localStorage.getItem('ticket_ref_number') || '',
      services: this.selectedServices.map((service) => {
        return {
          service_type: service,
          station:
            this.services_available.find(
              (desk) => desk.id === parseInt(this.selectedServiceId, 10)
            )?.name || '',
        };
      }),
      visit_date_time: new Date(),
      counter_assigned:
        this.services_available.find(
          (desk) => desk.id === parseInt(this.selectedServiceId, 10)
        )?.name || '',
    };
    let activity: Activity = {
      id: 0,
      by_ticket: 0,
      next_station: 0,
      is_waiting: false,
      completed: false,
      cancelled: false,
      status: '',
      created_on: new Date(),
      closed_on: new Date(),
    };
    const mobileNumber = this.mobileNumberInput.nativeElement.value;
    // const referredBy = this.referredByInput.nativeElement.value;
    if (
      !mobileNumber ||
      !this.selectedServiceId ||
      mobileNumber === '' ||
      this.selectedServiceId === ''
    ) {
      return this.showNotification('Invalid inputs', 'error');
    }
    activity = {
      ...activity,
      id: 1,
      by_ticket: ticket.id,
      next_station:
        this.services_available.find(
          (service) => service.id === parseInt(this.selectedServiceId, 10)
        )?.id || 0,
      is_waiting: true,
      status: 'PENDING',
    };

    const payload = {
      reference_number: ticket.reference_number,
      customer_name: ticket.customer_name,
      phone_number: ticket.phone_number,
      station: ticket.station,
      services: ticket.services,
    };

    this.getActivityService
      .get_pending_activities(
        this.token,
        this.services_available.find(
          (service) => service.id === parseInt(this.selectedServiceId, 10)
        )?.name
      )
      .subscribe({
        next: (data) => {
          console.log({ data });
          if (data.length > 0) {
            this.showNotification(
              'Desk is occupied, wait for your turn',
              'success'
            );
          }
          this.createTicketService
            .create_ticket(payload, this.token)
            .subscribe({
              next: (data) => {
                console.log({ ticket, token: this.token });
                if (data) {
                  localStorage.setItem('has_valid_ticket', 'true');
                  const ticket_details_array = JSON.parse(
                    localStorage.getItem('ticket_details') || '[]'
                  );
                  ticket_details_array.push(data);
                  localStorage.setItem(
                    'ticket_details',
                    JSON.stringify(ticket_details_array)
                  );
                  this.showNotification('Ticket created...', 'success');
                  setTimeout(() => {
                    this.router.navigate(['/ticket_create/success']);
                  }, 500);
                } else {
                  this.showNotification('An error occured', 'error');
                }
              },
            });
        },
      });

    // simulate backend POST
    // localStorage.setItem('ticket_details', JSON.stringify(ticket));
    // localStorage.setItem(`new_activity_details`, JSON.stringify(activity));

    // delay success for sake of toastr (notifer) - not needed, may remove
  }
  createDesk(event: Event) {
    event.preventDefault();
    const name = this.nameInput.nativeElement.value;
    const managed_by = this.selectedServiceId;
    const payload = {
      name,
      managed_by,
      is_open: true,
      is_occupied: true,
    };
    this.createTicketService.create_helpdesk(payload, this.token).subscribe({
      next: (data) => {
        if (data) {
          this.showNotification('Desk created...', 'success');
        } else {
          this.showNotification('An error occured', 'error');
        }
      },
    });
  }
  async authenticateAdmin(event: Event, argument: string) {
    this.isLoadingRequest = true;
    const email_address = this.emailAddressInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    if (
      !email_address ||
      !password ||
      email_address === '' ||
      password === ''
    ) {
      return this.showNotification('Invalid credentials', 'error');
    }
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
    };

    this.authFunc(payload, 'Admin');
  }

  addUser(event: Event) {
    event.preventDefault();
    this.isLoadingRequest = true;
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      name: this.nameInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
      role: this.selectedRole,
      teller_counter_name: 'null',
    };
    if (this.selectedRole === 'Teller') {
      payload.teller_counter_name =
        this.teller_counter_nameInput.nativeElement.value;
    }
    this.createUserService.createUser(payload).subscribe({
      next: (data: any) => {
        this.isLoadingRequest = false;
        if (data.error_invalid_input)
          this.showNotification('Invalid Input', 'error');
        if (!data) this.showNotification('Email exists', 'error');
        if (data.id) {
          this.showNotification('Created Successfully', 'success');
          if (this.selectedRole === 'Security') this.router.navigate(['/']);
          if (this.selectedRole === 'Teller') this.router.navigate(['/hr']);
          if (this.selectedRole === 'Admin') this.router.navigate(['/admin']);
        }
      },
    });
  }

  authUser(event: Event) {
    event.preventDefault();
    this.isLoadingRequest = true;
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
    };
    this.authFunc(payload, 'Teller');
  }

  startGuardSession(event: Event, argument: string): void {
    event.preventDefault();
    this.isLoadingRequest = true;
    const payload = {
      email: this.emailAddressInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
    };

    this.authFunc(payload, 'Security');
  }
  onRoleChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    this.selectionSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedRoleId = event.value;
    this.selectedRole =
      roles.find((role) => role.id === parseInt(this.selectedRoleId, 10))
        ?.title || '';
    console.log('selected role: ', this.selectedRole);
  }
  onGuardChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    console.log({ selectedId });
    this.selectionSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedGuardId = event.value;
  }
  onServiceChange(event: any): void {
    this.selectedService_id = event.value;
    console.log(event.value);
    this.selectedServices = this.selectedService_id;
  }
  onEntityChange(event: any): void {
    const selectedId = parseInt(event.value, 10);
    this.serviceSelected.emit(selectedId);
    this.has_valid_selected = true;
    this.selectedServiceId = event.value;
  }

  showNotification(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.toastService.showSuccess('Success', message);
    }
    if (type === 'error') {
      this.toastService.showError('Error', message);
    }
  }

  endSession() {
    this.sessionService.endSession();

    // refresh the page
    window.location.reload();
  }

  authFunc(payload: { email: string; password: string }, userType: string) {
    console.log({ userType });
    this.createUserService.loginUser(payload).subscribe({
      next: async (data: any) => {
        console.log({ data });
        if (!data)
          this.showNotification(
            'Error sending request, check credentials or try again later',
            'error'
          );
        if (data && data.error_invalid_input)
          this.showNotification('Invalid Input', 'error');
        if (data.access) {
          this.isLoadingRequest = false;

          const valid_user =
            (await this.getUserService.get_user_data(
              payload.email,
              'Admin',
              data.access
            )) || '';
          console.log({ valid_user });
          if (userType === 'Admin') {
            if (valid_user.role !== userType) {
              this.showNotification('Unauthorized access', 'error');
              return;
            }
            this.sessionStorageService.startAdminSession(data.access);
            window.location.reload();
          } else if (userType === 'Teller') {
            if (valid_user.role !== 'Teller') {
              this.showNotification('Unauthorized access', 'error');
              return;
            }
            this.sessionStorageService.startHelpDeskSession(data.access);
            this.router.navigate(['/hr']);
          } else if (userType === 'Security') {
            if (valid_user.role !== 'Security') {
              this.showNotification('Unauthorized access', 'error');
              return;
            }
            localStorage.setItem('guard_id', data.access);
            localStorage.setItem('guard_data', JSON.stringify(valid_user));
            this.router.navigate(['/']);
          }
          this.showNotification('Authenticated, logging in', 'success');
        }
      },
    });
  }
  remove(service: string): void {
    // const index = this.selectedServices.indexOf(service);
    // if (index >= 0) {
    //   this.selectedServices.splice(index, 1);
    //   this.serviceControl.setValue(this.selectedServices);
  }
}
