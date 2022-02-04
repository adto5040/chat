import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _isLoggedIn$ = new BehaviorSubject<string | null>(this.getUser());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor() {}

  setUsername(username: string) {
    localStorage.setItem('user', username);
    this._isLoggedIn$.next(username);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  removeUser() {
    localStorage.removeItem('user');
    this._isLoggedIn$.next('');
  }

  clear() {
    localStorage.clear();
  }
}
