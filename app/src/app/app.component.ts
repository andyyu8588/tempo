import { HttpService } from './services/http.service';
import { ElectronService } from 'ngx-electron';
import { StorageService } from './services/storage.service';
import { TimerService } from './services/timer.service';
import { SessionService } from './services/session.service';
import { Component, ViewChild, OnInit, OnDestroy, AfterContentInit, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  title = 'Tempo';

  private _state: Subscription
  state: boolean = true

  constructor(private SessionService: SessionService,
              private StorageService: StorageService,
              private ElectronService: ElectronService,
              private HttpService: HttpService) 
  {
    let data: {[key: string]: any} = this.StorageService.get()
    if (data.username) {
      localStorage.setItem('username', data.username)
      localStorage.setItem('password', data.password)
      SessionService.getTimeout()
    } else {
      console.log('undefined')
      localStorage.clear()
    }
  }

  ngOnInit() {
    this._state = this.SessionService.state.subscribe(bool => {
      this.state = bool
    })
  }

  ngDoCheck() {
  }

  checkLogin(): boolean {
    let bool = localStorage.getItem('username')? true : false
    return bool
  }

  toggleState() {
    this.state = !this.state
  }

  ngOnDestroy() {
    this._state.unsubscribe()
  }
}