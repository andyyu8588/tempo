import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // for login && register state
  private _state: BehaviorSubject<boolean> = new BehaviorSubject(true)
  state: Observable<boolean> = this._state.asObservable()

  constructor(private StorageService: StorageService) { }

  onStateToggle(bool: boolean) {
    this._state.next(bool)
  }

  login(username: string, password: string, timeout?: number) {
    this.StorageService.set({
      username: username,
      password: password,
    })
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    localStorage.setItem('timeout', timeout? timeout.toString() : '60')
  }
}
