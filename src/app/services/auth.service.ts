import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthPayload, AuthResponse } from '../models/auth';

function extractUsernameFromToken(token): string {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_claims.display_name;
  } catch (e) {
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_NAME = 'access_token';
  private readonly REFRESH_TOKEN_NAME = 'refresh_token';

  private userSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {
    const username = extractUsernameFromToken(sessionStorage.getItem('access_token'));
    this.userSubject = new BehaviorSubject<string>(username);
  }

  get username(): string {
    return this.userSubject.value;
  }

  login(payload: AuthPayload): Observable<string> {
    const url = `${environment.apiServer}/api/v1/auth/login`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      map(response => {
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
        const username = extractUsernameFromToken(response.access_token);
        this.userSubject.next(username);
        return username;
      })
    );
  }

  logout(): void {
    sessionStorage.clear();
    this.userSubject.next(null);
  }

  getAccessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_NAME);
  }

  getRefreshToken(): string {
    return sessionStorage.getItem(this.REFRESH_TOKEN_NAME);
  }

  refreshToken(): Observable<AuthResponse> {
    const headers = {
      Authorization: `Bearer ${this.getRefreshToken()}`
    };
    return this.http.post<any>(`${environment.apiServer}/api/v1/auth/refresh`, null, {headers}).pipe(
      tap((tokens: AuthResponse) => {
        this.storeAccessToken(tokens.access_token);
      })
    );
  }

  private storeAccessToken(token: string): void {
    sessionStorage.setItem(this.ACCESS_TOKEN_NAME, token);
  }
}
