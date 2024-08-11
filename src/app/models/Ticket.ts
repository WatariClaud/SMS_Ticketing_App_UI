export interface Ticket {
  id: number;
  by_user: number;
  start_time: Date;
  end_time: Date;
  total_waiting_time: number
  number_of_activities: number;
  served_by: number;
  created_by: number
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
  closed_on: Date
}