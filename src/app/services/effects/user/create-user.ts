// generate generic service to create a user fetching a generic api
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class CreateUser {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>('https://api.example.com/users', user);
  }
}
