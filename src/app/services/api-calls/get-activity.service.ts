import { Injectable } from '@angular/core';
import { sendRequest } from './base_request/fetch';
import {
  GET_ALL_VISIT_DETAILS,
  GET_USER_VISITATION_ACTIVITIES,
  GET_USER_VISITATION_PENDING,
  GET_VISITATION_ACTIVITIES_PENDING,
} from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class GetActivityService {
  constructor() {}
  get_pending_activities(token: string, teller_counter: string) {
    return sendRequest(
      null,
      `${GET_VISITATION_ACTIVITIES_PENDING}?teller_counter=${teller_counter}`,
      'GET',
      token
    );
  }
  get_activities(data: any, token: string) {
    return sendRequest(
      null,
      GET_USER_VISITATION_ACTIVITIES + '?reference_number=' + data,
      'GET',
      token
    );
  }

  get_all_visists(token: string) {
    return sendRequest(null, GET_ALL_VISIT_DETAILS, 'GET', token);
  }
}
