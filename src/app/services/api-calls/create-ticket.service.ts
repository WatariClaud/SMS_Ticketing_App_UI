import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';
import { CREATE_STATION, CREATE_USER_VISITATION, GET_REF_NUMBER } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  constructor() { }

  create_ref_no(): Observable<any> {
    return sendRequest(null, GET_REF_NUMBER, 'GET', '');
  }
  create_station(payload: any, token: string): Observable<any> {
    return sendRequest(payload, CREATE_STATION, 'POST', token)
  }
  create_ticket(payload: any): Observable<any> {
    return sendRequest(payload, CREATE_USER_VISITATION, 'POST', '')
  }
}