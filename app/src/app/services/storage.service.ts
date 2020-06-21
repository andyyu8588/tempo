import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private ElectronService: ElectronService) { }

  set(value: any): any {
    return this.ElectronService.ipcRenderer.sendSync('set', value)
  }

  get(value?: any): any {
    return this.ElectronService.ipcRenderer.sendSync('get', value)
  }
}
