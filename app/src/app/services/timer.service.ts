import { timer, BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { Injectable, DoCheck } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  state: string

  private _timeAlert: BehaviorSubject<boolean> = new BehaviorSubject(false)
  timeAlert: Observable<boolean> = this._timeAlert.asObservable()

  constructor(private ElectronService: ElectronService) { 
    console.log('boom')
    this.ElectronService.ipcRenderer.on('timeAlert', (event, arg) => {
      console.log(arg)
      this._timeAlert.next(true)
    })
  }

}
