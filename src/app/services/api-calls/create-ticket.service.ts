import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';
import {
  CANCEL_ACTIVITY,
  COMPLETE_ACTIVITY,
  CREATE_STATION,
  CREATE_USER_VISITATION,
  GET_REF_NUMBER,
  GET_STATIONS,
  GET_USER_VISITATION_PENDING,
} from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class CreateTicketService {
  constructor() {}

  create_ref_no(token: string): Observable<any> {
    return sendRequest(null, GET_REF_NUMBER, 'GET', token);
  }
  create_station(payload: any, token: string): Observable<any> {
    return sendRequest(payload, CREATE_STATION, 'POST', token);
  }
  create_ticket(payload: any, token: string): Observable<any> {
    return sendRequest(payload, CREATE_USER_VISITATION, 'POST', token);
  }

  create_helpdesk(payload: any, token: string) {
    return sendRequest(payload, CREATE_STATION, 'POST', token);
  }

  get_desks(token: string) {
    return sendRequest(null, GET_STATIONS, 'GET', token);
  }

  // complete and cancel in this service instead of new service
  cancel_activity(token: string, activity_id: number) {
    return sendRequest({ activity_id }, CANCEL_ACTIVITY, 'POST', token);
  }
  complete_activity(token: string, activity_id: number) {
    return sendRequest({ activity_id }, COMPLETE_ACTIVITY, 'POST', token);
  }
}
