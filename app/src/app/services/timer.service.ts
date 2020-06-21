import { ElectronService } from 'ngx-electron';
import { Injectable, DoCheck } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  state: string

  constructor(private ElectronService: ElectronService) { 
  }

  check() {
    console.log(this.ElectronService.ipcRenderer.sendSync('state', true))
  }
}
