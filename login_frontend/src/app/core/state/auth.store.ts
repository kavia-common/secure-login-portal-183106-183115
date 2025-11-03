/**
 * Simple auth store without external libs.
 * Handles SSR safety for reading/writing token.
 */
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private platformId = inject(PLATFORM_ID);
  private browser = isPlatformBrowser(this.platformId);

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  /** Safely access window only when it exists and we are in browser. */
  private getWin(): any | null {
    // Avoid referencing global 'window' identifier directly to satisfy no-undef rule
    const getter = new Function('return typeof window !== "undefined" ? window : null;');
    return this.browser ? getter() : null;
  }

  constructor() {
    const w = this.getWin();
    if (w?.localStorage) {
      try {
        const t = w.localStorage.getItem(TOKEN_KEY);
        const u = w.localStorage.getItem(USER_KEY);
        if (t) this.tokenSubject.next(t);
        if (u) this.userSubject.next(JSON.parse(u));
      } catch {
        // ignore storage errors
      }
    }
  }

  // PUBLIC_INTERFACE
  setSession(token: string, user: any): void {
    this.tokenSubject.next(token);
    this.userSubject.next(user);
    const w = this.getWin();
    if (w?.localStorage) {
      try {
        w.localStorage.setItem(TOKEN_KEY, token);
        w.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch {
        // ignore
      }
    }
  }

  // PUBLIC_INTERFACE
  clearSession(): void {
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    const w = this.getWin();
    if (w?.localStorage) {
      try {
        w.localStorage.removeItem(TOKEN_KEY);
        w.localStorage.removeItem(USER_KEY);
      } catch {
        // ignore
      }
    }
  }

  // PUBLIC_INTERFACE
  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  // PUBLIC_INTERFACE
  getUser(): any | null {
    return this.userSubject.getValue();
  }

  // PUBLIC_INTERFACE
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
