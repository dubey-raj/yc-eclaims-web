import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { RestService } from './http/rest.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_ENTRIES, ROUTE_PATHS } from '../constants/appConstants';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { AccountService } from './account.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RestService {
  private isLogged = new BehaviorSubject<boolean>(false);
  isLoggedAnnounced$ = this.isLogged.asObservable();

  constructor(
    http: HttpClient,
    private tokenStorageToken: TokenStorageService,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super(http, environment.authUrl);
  }

  public get currentUser(): User | null {
    const storedUserData = this.localStorageService.getValueByKey(
      LOCAL_STORAGE_ENTRIES.storedUser
    );

    if (storedUserData) {
      var storedUser = JSON.parse(storedUserData);
      return storedUser as User;
    }

    return null;
  }

  public get userRole(): string {
    let userRole = this.localStorageService.getValueByKey(LOCAL_STORAGE_ENTRIES.storedUserRole);
    return userRole ?? "";
  }

  async login(email: string, password: string) {
    return this.post('auth/token', { userName: email, password: password }).pipe(
      map(async (result) => {
        // login successful if there's a jwt token in the response
        if (!result.error) {
          let claims: any;
          claims = jwtDecode(result.accessToken);
          this.tokenStorageToken.setToken(result.accessToken);
          this.localStorageService.setValue(LOCAL_STORAGE_ENTRIES.storedUserRole, claims.role);
          await this.loadUserDetails(claims.sub);
          this.isLogged.next(true);
        } else {
          this.notificationService.showError(result.errorDescription);
        }

        return result;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(LOCAL_STORAGE_ENTRIES.storedUser);
    this.tokenStorageToken.clearToken();

    // broadcasting to listeners
    this.isLogged.next(false);

    // redirects
    this.router.navigate([ROUTE_PATHS.login]);
  }

  private async loadUserDetails(userId: any) {
    await firstValueFrom(this.accountService.loadUserDetails(userId)).then(
      (user) => {
        if (user) {
          this.storeLoadedUser(user);
        }
      }
    );
  }

  private async storeLoadedUser(user: any) {
    this.localStorageService.setValue(
      LOCAL_STORAGE_ENTRIES.storedUser,
      JSON.stringify(user)
    );
  }
}
