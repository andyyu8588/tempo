import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  done: boolean = false;
  first: boolean = true;
  pause: boolean = false;

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

  constructor() { }

  ngOnInit(): void {
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

    console.log(this.timePassed)
  
    // The output in MM:SS format
    return `${minutes}:${secondsString}`;
  }

  startTimer() {
    this.done = false;
    this.first = false;
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
}
