import { ElectronService } from 'ngx-electron';
import { StorageService } from './services/storage.service';
import { TimerService } from './services/timer.service';
import { SessionService } from './services/session.service';
import { RegisterComponent } from './components/register/register.component';
import { Component, ViewChild, OnInit, OnDestroy, AfterContentInit, DoCheck } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
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
              private ElectronService: ElectronService){
    if (this.StorageService.get()) {
      console.log(this.StorageService.get())
      
    } else {
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