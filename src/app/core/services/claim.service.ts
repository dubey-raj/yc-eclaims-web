import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RestService } from './http/rest.service';
import { environment } from '../../../environments/environment';
import { Policy } from '../models/policy';
import { ClaimRequest } from '../models/claim-request';
import { Claim, ClaimList } from '../models/claim';

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends RestService {
  controllerName = 'claim-service/claim';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl);
  }

  public addNewClaim(claim: any): Observable<any> {
    return this.postFile(`${this.controllerName}`, claim).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }

  public getClaims(): Observable<ClaimList> {
    return this.get('claim-service/claims').pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }

  public getClaim(claimNumber: string): Observable<Claim> {
    return this.get(`${this.controllerName}/${claimNumber}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }
}
