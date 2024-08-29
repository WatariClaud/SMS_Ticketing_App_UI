import { Visit } from "../visits/visits";

export interface Report {
  total_visits: number;
  total_visits_today: number;
  total_visit_statuses: {
    completed: number;
    in_progress: number;
  };
  total_visit_statuses_today: {
    in_progress: number;
  };
  visits: Visit[];
}
