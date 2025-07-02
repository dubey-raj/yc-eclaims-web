import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

export const AuthInterceptor : HttpInterceptorFn = 
  // constructor(
  //   private token: TokenStorageService,
  //   private authenticationService: AuthService) {}

  (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const tokenService = inject(TokenStorageService);
    const token = tokenService.getToken();
    let authReq = request;

    if (token) {
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next(authReq).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            
          }
        }
      ),
      catchError((error) => {
        // Handle other types of errors if needed
        return throwError(error);
      })
    );
  }
