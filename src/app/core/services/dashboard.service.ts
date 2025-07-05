import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RestService } from './http/rest.service';
import { environment } from '../../../environments/environment';
import { Policy } from '../models/policy';
import { ClaimRequest } from '../models/claim-request';
import { Claim, ClaimList } from '../models/claim';
import { DashboardData } from '../models/dasboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends RestService {
  controllerName = 'claim-service/dashboard';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl);
  }

  public getDashboardData(): Observable<DashboardData> {
    return this.get(`${this.controllerName}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }
}
