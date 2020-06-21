import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from './../../services/workout.service'
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatAccordion } from '@angular/material/expansion';

export class Node {
  children: Node[]
  type: string
  name: string
}

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  // workout stuff
  done: boolean = false;
  first: boolean = true;
  pause: boolean = false;
  progress: boolean = false;
  workout: any
  WIP: any

  // Start with an initial value of 20 seconds
  TIME_LIMIT = 20;
  WARNING_THRESHOLD = 10;
  ALERT_THRESHOLD = 5;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  timePassed = 0;
  timeLeft = this.TIME_LIMIT;
  timerInterval = null;

  COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: this.WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: this.ALERT_THRESHOLD
    }
  };

  remainingPathColor = this.COLOR_CODES.info.color;

  // expansion stuff
  @ViewChild(MatAccordion) accordion: MatAccordion;

  // tree stuff
  nestedTreeControl: NestedTreeControl<Node>
  nestedDataSource: MatTreeNestedDataSource<Node>
  dataChange: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);

  constructor(private HttpService: HttpService, private HttpClient: HttpClient, private WorkoutService : WorkoutService) {
    this.nestedTreeControl = new NestedTreeControl<Node>(this._getChildren)
    this.nestedDataSource = new  MatTreeNestedDataSource()
    this.dataChange.subscribe((data) => {
      this.nestedDataSource.data = data
    })

    this.dataChange.next([
      {
        name: "folder",
        type: "",
        children: [
          {
            name: "test3",
            type: "asd",
            children: [],
          }
        ],
      },
      {
        name: "folder",
        type: "",
        children: [
          {
            name: "test3",
            type: "asd",
            children: [],
          }
        ],
      },
      {
        name: "folder",
        type: "",
        children: [
          {
            name: "test3",
            type: "asd",
            children: [],
          }
        ],
      },
      {
        name: "test2",
        type: "asd",
        children: [],
      },
    ])
   }

  ngOnInit(): void {
    this.createWorkout()
  }

  private _getChildren = (node: Node) => {
    return observableOf(node.children)
  } 

  hasNestedChild = (_: number, nodeData: Node) => {
    return !(nodeData.type)
  } 

  formatTimeLeft(time: number) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    let secondsString;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 0) {
      return "Done!"
    } else if (seconds == 0) {
      this.stopTimer()
    } else if (seconds < 10) {
      secondsString = `0${seconds}`;
    } else {
      secondsString = seconds;
    }

    this.setRemainingPathColor(this.timeLeft)

    // The output in MM:SS format
    return `${minutes}:${secondsString}`;
  }

  startTimer() {
    this.progress = true;
    this.done = false;
    this.first = false;
    this.WIP = this.workout
    this.timerInterval = setInterval(() => {

      // The amount of time passed increments by one
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;

      // The time left label is updated
      document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(this.timeLeft);
      this.setCircleDasharray();
    }, 1000);
  }

  stopTimer() {
    this.done = true;
    this.timeLeft = this.TIME_LIMIT
    this.timePassed = 0
    clearInterval(this.timerInterval)
    this.timerInterval = null;
  }

  pauseTimer() {
    this.pause = true;
    clearInterval(this.timerInterval)
  }

  resumeTimer() {
    this.pause = false;
    this.startTimer();
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * 283
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  setRemainingPathColor(timeLeft: number) {
    const { alert, warning, info } = this.COLOR_CODES;

    // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  // creates workout and send
  createWorkout(){
   this.WorkoutService.createWorkout(localStorage.getItem('username')).then((res) => {
     this.workout = res
   }).catch((err) => {
     console.log(err)
   })
  }

  saveWorkout() {
    this.WorkoutService.saveWorkout(this.workout, localStorage.getItem('username')).then((res) => {
      console.log('workout saved')
    }).catch((err) => {
      console.log(err)
    })
  }
}
