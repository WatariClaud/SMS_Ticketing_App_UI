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
import { CreateActivityService } from '../../../../services/api-calls/create-activity.service';
import { Router } from '@angular/router';
import { TimeService } from '../../../../services/session/time-tracking.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CurrentTimeComponent, NotifierComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
})
export class MainDashboardComponent implements OnInit {
  current_activity: any;
  ref_no: any;
  activities_current: any;
  pending_activities: any;
  in_progress_activities: any;
  counter: any;
  timeDifference: any;
  constructor(
    private getUserService: GetUserService,
    private getActivityService: GetActivityService,
    private sessionStorageService: SessionStorageService,
    private createTicketService: CreateTicketService,
    private createActivityService: CreateActivityService,
    private timeService: TimeService,
    private state: GetState,
    private router: Router
  ) { }
  private routeSubscription: Subscription = new Subscription();
  @Input() isTeller: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() viewingPending: boolean = false;
  isLoading: boolean = true;
  private subscription: Subscription | null = null;

  notificationMessage: string | null = null;
  notificationType: string = 'error';

  userList: any[] = [];

  hasValidTicket = localStorage.getItem('has_valid_ticket') || '{}';
  ticket_details = localStorage.getItem('ticket_details') || '{}';
  ticket_activity_details =
    localStorage.getItem('new_activity_details') || '{}';

  activities: any[] = [];

  ticket: any;
  activity: any;

  customer_name: string = '';
  service_name: string = '';
  started_on: string = '';
  has_current: boolean = false;
  currentRoute: string = '';
  next_in_line: any;
  token: string = '';
  authenticatedTeller: any;
  startedOnFormatted!: Date;
  desks: any[] = [];
  has_pending: boolean = false;

  ngOnInit(): void {
    this.token =
      this.sessionStorageService.getHelpDeskToken() ??
      this.sessionStorageService.getAdminToken() ??
      '';
    this.current_activity = JSON.parse(
      localStorage.getItem('current_activity') || '{}'
    );
    const ticket: Ticket = JSON.parse(this.ticket_details)[0];
    const activity: Activity = JSON.parse(this.ticket_activity_details)[0];

    if (this.isAdmin) {
      this.getUserService
        .getUsers(this.sessionStorageService.getAdminToken())
        .subscribe({
          next: (data: any) => {
            this.userList = data;
            this.isLoading = false;
          },
          error: (err: any) => {
            console.error('An error occurred:', err);
          },
        });
    } else {
      this.getUserService.getUser(this.token).subscribe({
        next: (data: any) => {
          if (!data) window.location.replace('/login-user');
          if (data) {
            this.authenticatedTeller = data;
            this.createTicketService.get_desks(this.token).subscribe({
              next: (data) => {
                if (data && data.length > 0) {
                  this.desks = data.filter((item: { managed_by: any }) => {
                    return item.managed_by === this.authenticatedTeller.id
                      ? item
                      : null;
                  });
                  const has_pending_activities = this.desks.filter((item) => {
                    return item.is_open === true &&
                      item.managed_by === this.authenticatedTeller.id
                      ? item
                      : [];
                  });
                  console.log({ desks: has_pending_activities });
                  this.counter = has_pending_activities[0].name;
                  if (has_pending_activities.length > 0) {
                    this.getActivityService
                      .get_pending_activities(
                        this.sessionStorageService.getHelpDeskToken() || '',
                        has_pending_activities[0].name || ''
                      )
                      .subscribe({
                        next: (data: any) => {
                          console.clear();
                          console.log(data);
                          this.isLoading = false;
                          if (!data || data.length === 0) {
                            this.has_current = false;
                          } else {
                            this.pending_activities = data.filter(
                              (item: { status: string }) => {
                                return item.status === 'pending';
                              }
                            );
                            this.activities_current = data.filter(
                              (item: { status: string }) => {
                                return item.status === 'in_progress';
                              }
                            );
                            if (!this.viewingPending) {
                              this.activities_current.forEach((item: any) => {
                                item.original_date = item.created_on;
                                item.created_on = formatTimestamp(
                                  item.created_on
                                );
                              });
                            }
                            if (this.pending_activities.length > 0) {
                              this.has_pending = true;
                            }
                          }
                        },
                      });
                  } else {
                    this.has_current = false;
                  }
                }
                return this.desks;
              },
            });
          }
        },
      });
    }
  }

  get_diff(type: 'complete' | 'cancel', started: Date) {
    this.subscription = this.timeService.timeDifference$.subscribe(
      (timeDiff: string) => {
        const regex = /(\d+) days, (\d+) hours, (\d+) minutes, (\d+) seconds/;
        const match = timeDiff.match(regex);
        if (match) {
          const [_, days, hours, minutes, seconds] = match.map(Number);
          const notificationMessage =
            type === 'complete'
              ? `Completed session, Spent ${days} days,  ${hours} hours, ${minutes} minutes and ${seconds} seconds`
              : `Cancelled session, Spent ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

          this.showNotification(notificationMessage, 'success');
        }
      }
    );
  }

  completeSession(activity: any) {
    const id: any = activity.id;
    console.log({ activity });

    this.get_diff('complete', parseTimestamp(activity.created_on));
    this.createTicketService.complete_activity(this.token, id).subscribe({
      next: (data) => {
        console.log({ data });
        if (data) {
          this.has_current = false;
          this.router.navigate(['/hr/activity/pending']);
        }
      },
    });
  }
  cancelSession(activity: any) {
    const id = activity.id;
    console.log({ activity });
    this.get_diff('cancel', parseTimestamp(activity.created_on));
    this.createTicketService.cancel_activity(this.token, id).subscribe({
      next: (data) => {
        // console.clear();
        console.log({ data });
      },
    });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }

  update_activity_status(activity: any) {
    this.showNotification('Starting serve for ' + activity.id, 'success');
    console.log({ activity });
    this.createActivityService
      .update_activity_status(activity.id, this.token)
      .subscribe({
        next: (data) => {
          // console.clear();
          console.log('act status updated to -> ', data);
          localStorage.setItem('current_activity', JSON.stringify([data]));
          this.activities.splice(0, 1);
          this.router.navigate(['/hr']);
        },
      });
  }
}
