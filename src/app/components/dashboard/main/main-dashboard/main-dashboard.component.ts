import { Component, Inject, Input, OnInit } from '@angular/core';
import { Ticket, Activity } from '../../../../models/Ticket';
import { users } from '../../../../dummy-data/user';
import { services_available } from '../../../../dummy-data/services_available';
import { formatTimestamp } from '../../../../globals/functions';
import { CurrentTimeComponent } from '../../../current_time/current-time/current-time.component';
import { NotifierComponent } from '../../../notifier/notifier/notifier.component';
import { GetUserService } from '../../../../services/api-calls/get-user.service';
import { SessionStorageService } from '../../../../services/session/session-storage.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [
    CurrentTimeComponent,
    NotifierComponent
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit{
  constructor(
    private getUserService: GetUserService,
    private sessionStorageService: SessionStorageService
  ) {}
  @Input() isTeller: boolean = false;
  @Input() isAdmin: boolean = false;
  
  notificationMessage: string | null = null;
  notificationType: string = 'error';

  hasValidTicket = localStorage.getItem('has_valid_ticket') || '{}';
  ticket_details = localStorage.getItem('ticket_details') || '{}';
  ticket_activity_details = localStorage.getItem('new_activity_details') || '{}';

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
    reference_number: ''
  }
  activity: Activity = {
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
  
  customer_name: string = '';
  service_name: string = '';
  started_on: string = '';
  has_current: boolean = false;

  ngOnInit(): void {
    const ticket: Ticket = JSON.parse(this.ticket_details);
    const activity: Activity = JSON.parse(this.ticket_activity_details);

    if (this.hasValidTicket && ticket.id) {
      this.has_current = true;
      this.customer_name = users.find((user) => user.name === ticket.customer_name)?.name || '',
      this.service_name = services_available.find((service) => service.id === activity.next_station)?.title || '',
      this.started_on = formatTimestamp(ticket.start_time);

      this.ticket = {
        ...ticket,
        id: ticket.id,
        created_by: ticket.created_by
      }
    }

    this.getUserService.getUser(this.sessionStorageService.getToken())
    .subscribe({
      next: (data: any) => {
        console.log({data});
      }
    });;
  }
  closeSession() {
    return this.showNotification('Still building', 'success');
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    setTimeout(() => (this.notificationMessage = null), 3000);
  }
}
