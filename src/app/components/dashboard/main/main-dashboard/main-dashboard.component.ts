import { Component, Inject, Input, OnInit } from '@angular/core';
import { GetState } from '../../../../services/get-state';
import { Ticket, Activity } from '../../../../models/Ticket';
import { users } from '../../../../dummy-data/user';
import { services_available } from '../../../../dummy-data/services_available';
import {
  formatDifference,
  formatTimestamp,
  parseTimestamp,
} from '../../../../globals/functions';
import { CurrentTimeComponent } from '../../../current_time/current-time/current-time.component';
import { NotifierComponent } from '../../../notifier/notifier/notifier.component';
import { GetUserService } from '../../../../services/api-calls/get-user.service';
import { SessionStorageService } from '../../../../services/session/session-storage.service';
import { Subscription } from 'rxjs';
import { GetActivityService } from '../../../../services/api-calls/get-activity.service';
import { CreateTicketService } from '../../../../services/api-calls/create-ticket.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CurrentTimeComponent, NotifierComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
})
export class MainDashboardComponent implements OnInit {
  constructor(
    private getUserService: GetUserService,
    private getActivityService: GetActivityService,
    private sessionStorageService: SessionStorageService,
    private createTicketService: CreateTicketService,
    private state: GetState
  ) {}
  private routeSubscription: Subscription = new Subscription();
  @Input() isTeller: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() viewingPending: boolean = false;

  notificationMessage: string | null = null;
  notificationType: string = 'error';

  userList: any[] = [];

  hasValidTicket = localStorage.getItem('has_valid_ticket') || '{}';
  ticket_details = localStorage.getItem('ticket_details') || '{}';
  ticket_activity_details =
    localStorage.getItem('new_activity_details') || '{}';

  activities: any[] = [];

  ticket: Ticket = {
    id: 0,
    customer_name: '',
    start_time: new Date(),
    end_time: new Date(),
    total_waiting_time: 0,
    number_of_activities: 0,
    served_by: 0,
    created_by: 0,
    phone_number: '',
    station: '',
    reference_number: '',
    services: [],
    visit_date_time: new Date(),
    counter_assigned: '',
  };
  activity: Activity = {
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

  customer_name: string = '';
  service_name: string = '';
  started_on: string = '';
  has_current: boolean = false;
  currentRoute: string = '';
  next_in_line: any;
  token: string = '';
  authenticatedTeller: any;
  startedOnFormatted!: Date;

  ngOnInit(): void {
    this.token =
      this.sessionStorageService.getHelpDeskToken() ||
      this.sessionStorageService.getAdminToken() ||
      '';
    const ticket: Ticket = JSON.parse(this.ticket_details)[0];
    const activity: Activity = JSON.parse(this.ticket_activity_details)[0];
    if (this.isAdmin) {
      this.getUserService
        .getUsers(this.sessionStorageService.getAdminToken())
        .subscribe({
          next: (data: any) => {
            console.log({ data });
            this.userList = data;
          },
        });
    } else {
      this.getUserService.getUser(this.token).subscribe({
        next: (data: any) => {
          if (data) {
            this.authenticatedTeller = data;
            this.createTicketService.get_desks(this.token).subscribe({
              next: (data) => {
                if (data && data.length > 0) {
                  data.filter((item: { managed_by: any }) => {
                    return item.managed_by === this.authenticatedTeller.id
                      ? (this.activities = [...this.activities, item])
                      : null;
                  });
                }
              },
            });
          }
        },
      });

      this.getActivityService
        .get_pending_activities(
          this.sessionStorageService.getHelpDeskToken() || '',
          ticket?.counter_assigned || ''
        )
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.has_current = false;
            } else {
              let index = 0;
              for (const item of data) {
                console.log({ item });
                if (item.status === 'in_progress') {
                  this.has_current = true;
                  this.customer_name = data[0].customer_name;
                  this.started_on = formatTimestamp(data[0].visit_date_time);
                  this.startedOnFormatted = new Date(data[0].visit_date_time);
                } else if (item.status === 'pending') {
                  this.next_in_line = data[0];
                  if (index === 1) break;
                  console.log('nil', this.next_in_line);
                }
                index++;
              }

              this.activities = data;
              console.log('activity: ', { data });
            }
          },
        });
    }
  }
  get_diff(type: 'complete' | 'cancel') {
    const diff = this.startedOnFormatted.getTime() - new Date().getTime(); // Difference in milliseconds
    const { hours, minutes, seconds } = formatDifference(diff);
    const notificationMessage =
      type === 'complete'
        ? `Completed session, Spent ${hours} hours, ${minutes} minutes and ${seconds} seconds`
        : `Cancelled session, Spent ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    return this.showNotification(notificationMessage, 'success');
  }
  completeSession() {
    const activity: any = this.activities[0];
    console.log({ activity });

    this.get_diff('complete');
    this.createTicketService
      .complete_activity(this.token, activity.id)
      .subscribe({
        next: (data) => {
          console.clear();
          console.log({ data });
        },
      });
  }
  cancelSession() {
    const activity: any = this.activities[0];
    console.log({ activity });
    this.get_diff('cancel');
    this.createTicketService
      .cancel_activity(this.token, activity.id)
      .subscribe({
        next: (data) => {
          console.clear();
          console.log({ data });
        },
      });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }

  update_activity_status(visit_id: string) {
    this.showNotification('Starting serve for ' + visit_id, 'success');
  }
}
