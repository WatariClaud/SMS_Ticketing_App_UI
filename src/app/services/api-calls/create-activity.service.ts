import { Injectable } from '@angular/core';
import { sendRequest } from './base_request/fetch';
import { UPDATE_ACTIVITY_STATUS } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class CreateActivityService {
  constructor() {}

  update_activity_status(id: number, token: string) {
    return sendRequest(
      { activity_id: id },
      UPDATE_ACTIVITY_STATUS,
      'POST',
      token
    );
  }
}
