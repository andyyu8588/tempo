import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bigsettings',
  templateUrl: './bigsettings.component.html',
  styleUrls: ['./bigsettings.component.scss']
})
export class BigsettingsComponent implements OnInit {
  reset: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onReset() {
    this.reset = false
    setTimeout(() => {
      this.reset = true
    }, 100)
  }
}
