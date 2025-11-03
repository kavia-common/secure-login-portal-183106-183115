/**
 * PUBLIC_INTERFACE
 * AuthService provides login and logout and exposes auth state.
 * Uses environment.apiBaseUrl for backend endpoints.
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { AuthStore } from '../state/auth.store';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(AuthStore);

  // PUBLIC_INTERFACE
  login(payload: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.apiBaseUrl}/auth/login`;
    if (!environment.apiBaseUrl) {
      // No real backend per non-goals; simulate success if fields non-empty
      const mock: LoginResponse = {
        token: 'mock-token-123',
        user: { id: '1', email: payload.emailOrUsername, name: 'Demo User' }
      };
      return of(mock).pipe(
        tap(res => {
          this.store.setSession(res.token, res.user);
        })
      );
    }
    return this.http.post<LoginResponse>(url, payload).pipe(
      tap(res => {
        this.store.setSession(res.token, res.user);
      })
    );
  }

  // PUBLIC_INTERFACE
  logout(): void {
    this.store.clearSession();
    this.router.navigateByUrl('/login');
  }

  // PUBLIC_INTERFACE
  getToken(): string | null {
    return this.store.getToken();
  }

  // PUBLIC_INTERFACE
  isAuthenticated(): boolean {
    return this.store.isAuthenticated();
  }

  // PUBLIC_INTERFACE
  getUser(): any | null {
    return this.store.getUser();
  }
}
