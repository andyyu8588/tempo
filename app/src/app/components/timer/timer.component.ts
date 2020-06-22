import { TimerService } from './../../services/timer.service';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild, OnDestroy, NgModule } from '@angular/core';
import { WorkoutService } from './../../services/workout.service'
import { MatAccordion } from '@angular/material/expansion';



export class Node {
  children: Node[]
  type: string
  name: string
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  time: number

  private _sec: Subscription

  constructor(private TimerService: TimerService) {
    this._sec = this.TimerService.timeLeft.subscribe((num: number) => {
      this.time = num
    })
  }

  ngOnInit() {

  }

  timeLeft(): number {
    let max = parseInt(localStorage.getItem('timeout'))*60
    let frac = Math.trunc((this.time/max)*100)
    console.log(frac)
    return frac
  }

  ngOnDestroy() {
    this._sec.unsubscribe()
  }
}
