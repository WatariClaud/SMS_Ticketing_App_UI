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
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

/*
{
    "message": "Good Morning Aubrey Barrett, you will proceed to the following counters: Service 2 at C990. Your Ticket Number: undefined.",
    "visit": {
        "id": 68,
        "reference_number": "undefined",
        "customer_name": "Aubrey Barrett",
        "phone_number": "+1 (607) 738-2399",
        "status": "in_progress",
        "visit_date_time": "2024-08-30T00:49:42.211162+03:00",
        "total_service_time": "0:00:00",
        "waiting_time": "0:00:00"
    }
}
*/
interface SingleTicket {
  message: string;
  visit: {
    id: number;
    reference_number: string;
    customer_name: string;
    phone_number: string;
    status: string;
    visit_date_time: string;
    total_service_time: string;
    waiting_time: string;
  };
}
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
    ChipModule,
    ButtonModule
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

  displayTicket: SingleTicket | null = null;

  ngOnInit(): void {
    if (this.hasValidTicket && this.ticket_details) {
      const ticket: Ticket = JSON.parse(this.ticket_details)[
        JSON.parse(this.ticket_details).length - 1
      ];

      this.displayTicket = {
        ...JSON.parse(this.ticket_details)[
        JSON.parse(this.ticket_details).length - 1
        ],
        visit_date_time: formatTimestamp(
          JSON.parse(this.ticket_details)[
            JSON.parse(this.ticket_details).length - 1
          ].visit_date_time
        ),
      };


      const activity: Activity = JSON.parse(this.ticket_activity_details)[
        JSON.parse(this.ticket_details).length - 1
      ];

      this.customer_name = ticket.customer_name;
      this.started_on = formatTimestamp(ticket.visit_date_time);

      this.ticket = {
        ...ticket,
        start_time: new Date(ticket.start_time),
        visit_date_time: new Date(ticket.visit_date_time),
      };
    }
  }
}
