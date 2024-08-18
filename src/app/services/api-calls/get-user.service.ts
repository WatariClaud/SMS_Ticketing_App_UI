import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { CREATE_USER, AUTH_USER, GET_USER } from './endpoints';
import { catchError, from, map, Observable, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
   
  getUser(token: any): Observable<any> {
    return sendRequest(token, GET_USER, 'GET');
  }
}
