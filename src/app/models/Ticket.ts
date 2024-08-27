export interface Ticket {
  id: number;
  customer_name: string;
  phone_number: string;
  station: string;
  services: any[];
  start_time: Date;
  end_time: Date | null;
  total_waiting_time: number;
  number_of_activities: number;
  served_by: number;
  created_by: number;
  reference_number: string;
  visit_date_time: Date;
  counter_assigned: string;
}

export interface Activity {
  id: number;
  by_ticket: number;
  next_station: number;
  is_waiting: boolean;
  completed: boolean;
  cancelled: boolean;
  status: string;
  created_on: Date;
  closed_on: Date;
}

export const roles = [
  {
    id: 1,
    title: 'Teller',
  },
  {
    id: 2,
    title: 'Admin',
  },
  {
    id: 3,
    title: 'Security',
  },
];
