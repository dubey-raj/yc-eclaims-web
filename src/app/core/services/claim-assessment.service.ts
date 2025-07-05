import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RestService } from './http/rest.service';
import { environment } from '../../../environments/environment';
import { Claim, ClaimList } from '../models/claim';

@Injectable({
  providedIn: 'root',
})
export class ClaimAssessmentService extends RestService {
  controllerName = 'claim-service/claim/assessment';

  constructor(http: HttpClient) {
    super(http, environment.apiUrl);
  }

  public assessClaim(claim: any): Observable<any> {
    return this.postFile(`${this.controllerName}`, claim).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return [];
      })
    );
  }

  public reviewClaim(claim: any): Observable<any> {
    return this.postFile(`claim-service/claim/review`, claim).pipe(
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
