import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { CREATE_USER, AUTH_USER } from './endpoints';
import { catchError, from, map, Observable, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';

@Injectable({
  providedIn: 'root'
})

export class CreateUserService {

  isValidData = (data: string) => {
    if((!data) || (data === '')) return false;
    return true;
   }
   
  createUser(payload: any): Observable<any> {
    const {
      email,
      name,
      password,
      role,
    } = payload;
    if (!this.isValidData(email) || !this.isValidData(password) || !this.isValidData(name) || !this.isValidData(role)) {
      return of({
        error_invalid_input: true
      });
    }
    return sendRequest(payload, CREATE_USER, 'POST');
  }
  loginUser(payload: any): Observable<any> {
    const {
      email,
      password,
    } = payload;
    if ((email === '') || (!password)) {
      return of({
        error_invalid_input: true
      });
    }
    return sendRequest(payload, AUTH_USER, 'POST');
  }
}
