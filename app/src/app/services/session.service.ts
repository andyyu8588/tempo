import { ElectronService } from 'ngx-electron';
import { HttpService } from './http.service';
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

  constructor(private StorageService: StorageService,
              private HttpService: HttpService,
              private ElectronService: ElectronService) { }

  onStateToggle(bool: boolean) {
    this._state.next(bool)
  }

  login(username: string, password: string) {
    this.StorageService.set({
      username: username,
      password: password,
    })
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  getTimeout() {
    // find workout interval
    this.HttpService.get('/user', {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    })
    .then((response: any) => {
      let obj = response.user[0]
      localStorage.setItem('timeout', obj.timeout)
      this.ElectronService.ipcRenderer.send('timeout', obj.timeout)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
