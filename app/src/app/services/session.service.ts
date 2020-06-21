import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // for login && register state
  private _state: BehaviorSubject<boolean> = new BehaviorSubject(true)
  state: Observable<boolean> = this._state.asObservable()

  constructor() { }

  onStateToggle(bool: boolean) {
    this._state.next(bool)
  }
}
