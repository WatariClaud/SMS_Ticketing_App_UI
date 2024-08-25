import { Component, OnInit } from '@angular/core';
import { Activity, Ticket } from '../../../models/Ticket';
import { users } from '../../../dummy-data/user';
import { services_available } from '../../../dummy-data/services_available';
import { formatTimestamp } from '../../../globals/functions';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-ticket-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatListModule,
  ],
  templateUrl: './ticket-actions.component.html',
  styleUrl: './ticket-actions.component.css',
})
export class TicketActionsComponent implements OnInit {
  hasValidTicket = localStorage.getItem('has_valid_ticket');
  ticket_details = localStorage.getItem('ticket_details') || '{}';
  ticket_activity_details =
    localStorage.getItem('new_activity_details') || '{}';
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

  ngOnInit(): void {
    if (this.hasValidTicket && this.ticket_details) {
      const ticket: Ticket = JSON.parse(this.ticket_details)[
        JSON.parse(this.ticket_details).length - 1
      ];
      const activity: Activity = JSON.parse(this.ticket_activity_details)[
        JSON.parse(this.ticket_details).length - 1
      ];

      this.customer_name = ticket.customer_name;
      this.started_on = formatTimestamp(ticket.visit_date_time);

      this.ticket = {
        ...ticket,
        id: ticket.id,
        created_by: ticket.created_by,
      };
    }
  }
}
