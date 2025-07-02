import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RestService } from './http/rest.service';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends RestService {
  controllerName = 'user';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl);
  }

  public loadUserDetails(userId: any): Observable<User> {
    return this.get(`user-api/user/${userId}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }

  // public registerCustomer(
  //   request: RegisterCustomerRequest
  // ): Observable<boolean> {
  //   return this.post(`${this.controllerName}/register`, request).pipe(
  //     catchError((error) => {
  //       console.error('Error:', error);
  //       return [];
  //     })
  //   );
  // }

  // public updateCustomer(
  //   request: UpdateCustomerRequest
  // ): Observable<boolean> {
  //   return this.patch(
  //     `${this.controllerName}/update`, request)
  //   .pipe(
  //     catchError((error) => {
  //       console.error('Error:', error);
  //       return [];
  //     })
  //   );
  // }
}
