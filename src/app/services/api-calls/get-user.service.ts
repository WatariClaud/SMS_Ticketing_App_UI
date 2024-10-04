import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { CREATE_USER, AUTH_USER, GET_USER, GET_USERS } from './endpoints';
import { catchError, from, map, Observable, of } from 'rxjs';
import { sendRequest } from './base_request/fetch';
import { SessionStorageService } from '../session/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private sessionStorageService: SessionStorageService) {}

  getUser(token: any): Observable<any> {
    return sendRequest(null, GET_USER, 'GET', token);
  }
  getUsers(token: any): Observable<any> {
    return sendRequest(null, GET_USERS, 'GET', token);
  }

  get_user_data(
    user_identifier: string,
    user_role: string,
    token: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUsers(token).subscribe({
        next: (data) => {
          // console.clear();
          console.log(data);
          const user = data.find(
            (user: { email: string }) => user.email === user_identifier
          );
          resolve(user);
        },
        error: (err) => reject(err),
      });
    });
  }
}
