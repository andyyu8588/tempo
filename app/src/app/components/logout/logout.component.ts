import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private StorageService: StorageService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
    this.StorageService.set({destroy: true})
    // window.location.reload()
  }

}
