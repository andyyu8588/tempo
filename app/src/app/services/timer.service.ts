import { timer } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { Injectable, DoCheck } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  state: string
  timer

  constructor(private ElectronService: ElectronService) { 
    console.log('boom')
    this.ElectronService.ipcRenderer.on('timeAlert', (event, arg) => {
      console.log(arg)
    })
  }

}
