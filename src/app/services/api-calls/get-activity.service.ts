import { Injectable } from '@angular/core';
import { sendRequest } from './base_request/fetch';
import {
  GET_USER_VISITATION_ACTIVITIES,
  GET_USER_VISITATION_PENDING,
} from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class GetActivityService {
  constructor() {}
  get_pending_activities(token: string, teller_counter: string) {
    return sendRequest(
      null,
      `${GET_USER_VISITATION_PENDING}?teller_counter=${teller_counter}`,
      'GET',
      token
    );
  }
  get_activities(data: any, token: string) {
    console.log('get_activities: ', { data });
    return sendRequest(
      null,
      GET_USER_VISITATION_ACTIVITIES + '?reference_number=' + data,
      'GET',
      token
    );
  }
}
