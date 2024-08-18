import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';
import { GET_REF_NUMBER } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor() { }

  create_ref_no(): Observable<any> {
    return sendRequest(null, GET_REF_NUMBER, 'GET');
  }
}
