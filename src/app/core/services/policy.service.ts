import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RestService } from './http/rest.service';
import { environment } from '../../../environments/environment';
import { Policy } from '../models/policy';

@Injectable({
  providedIn: 'root',
})
export class PolicyService extends RestService {
  controllerName = 'claim-service/policy';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl);
  }

  public loadPolicyDetails(policyNumber: any): Observable<Policy> {
    return this.get(`${this.controllerName}/${policyNumber}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }
}
