import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('toworkout') toworkout: HTMLButtonElement

  constructor() { }

  ngOnInit(): void {
  }

  onToWorkout() {
    this.toworkout.click()
  }

}
