import { SidebarComponent } from './../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, interval, timer } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { Injectable, DoCheck, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  state: string
  notif: Notification
  timer: any
  sec: any

  // time left in seconds
  left: number = parseInt(localStorage.getItem('timeout')) * 60

  private _timeLeft: BehaviorSubject<number> = new BehaviorSubject(this.left)
  timeLeft: Observable<number> = this._timeLeft.asObservable()

  constructor(private ElectronService: ElectronService,
              private Router: Router,
              private NgZone: NgZone)
  {
    // listen for idle
    this.ElectronService.ipcRenderer.on('idle', (event, arg) => {
      console.log('idle')
      clearInterval(this.timer)
      clearInterval(this.sec)
    })

    // countdown to next workout
    this.timer = setInterval(() => {
      this.left = parseInt(localStorage.getItem('timeout'))*60

      // create notification
      this.notif = new Notification('Time to Take a Break!', {
        body: 'Your new workout is ready',
      })

      // redrect to workout page
      this.notif.onclick = () => {
        this.NgZone.run(() => {
          Router.navigateByUrl('/workout')
        })
      }
    }, parseInt(localStorage.getItem('timeout'))*60000)

    this.sec = setInterval(() => {
      this.left = this.left - 1
      this._timeLeft.next(this.left)
    }, 1000)
  }

}
