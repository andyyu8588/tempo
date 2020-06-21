import { Subscription, timer } from 'rxjs';
import { MatSlider } from '@angular/material/slider';
import { SessionService } from './../../../services/session.service';
import { StorageService } from './../../../services/storage.service';
import { TimerService } from './../../../services/timer.service';
import { ElectronService } from 'ngx-electron';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewChecked, OnDestroy {
  responseStatus: boolean = false
  updateStatus: boolean = false
  @ViewChild('timer') workoutDuration: MatSlider
  @ViewChild('timeout') interval: MatSlider

  selectedDifficulty = 'Beginner'

  muscleGroups: any[]
  private _muscleGroups: any[] = []

  equipment: any[]
  private _equipment: any[] = []

  private _time: Subscription
  private _timeout: Subscription
  time: number = 10
  timeout1: number = 60

  onStartup: boolean

  constructor(private HttpService: HttpService,
              private ElectronService: ElectronService,
              private TimerService: TimerService,
              private SessionService: SessionService) {

    this.onStartup = this.ElectronService.ipcRenderer.sendSync('startup')


  }

  ngOnInit(): void {
    this.muscleGroups = ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']
    this.equipment = ['Bands', 'Barbell', 'Bench', 'Dumbbell', 'Exercise Ball', 'EZ - Bar', 'Foam Roll', 'Kettlebell', 'Machine - Cardio', 'Machine - Strength', 'Pull Bar', 'Weight Plate']
    // importing user preferences
    this.HttpService.get('/user', {username: localStorage.getItem('username')})
    .then((user: {[key: string]: any}) => {
      let obj = user.user[0]
      this.selectedDifficulty = obj.difficulty
      this._equipment = obj.equipment
      this._muscleGroups = obj.bodyPart
      this.time = obj.workoutDuration
      this.timeout1 = obj.timeout
    })
    .catch(err => {
      this.responseStatus = true
    })
  }

  ngAfterViewChecked() {
    // listen to slider changes
    // this._time = this.timer.change.subscribe(() => {
    //   this.time = this.timer.value
    // })
    // this._timeout = this.interval.change.subscribe(() => {
    //   this.timeout1 = this.interval.value
    // })


  }

  changeMuscle(value: string) {
    if (this._muscleGroups.includes(value)) {
      this._muscleGroups.splice(this._muscleGroups.indexOf(value), 1)
    } else {
      this._muscleGroups.push(value)
    }
  }
  
  muscleCheck(value: string): boolean {
    if (this._muscleGroups.includes(value)) {
      return true
    } else {
      return false
    }
  }

  changeEquip(value: string) {
    if (this._equipment.includes(value)) {
      this._equipment.splice(this._equipment.indexOf(value), 1)
    } else {
      this._equipment.push(value)
    }
  }

  equipCheck(value: string): boolean {
    if (this._equipment.includes(value)) {
      return true
    } else {
      return false
    }
  }

  toggleStartup() {
    let status = this.ElectronService.ipcRenderer.sendSync('toggleStartup')
    if (status != '') {
      this.onStartup = this.onStartup
    } else {
      this.onStartup = !this.onStartup
    }
  }
  
  onSubmit() {
    console.log(this._muscleGroups)
    this._equipment.push('Body Only')
    this.responseStatus, this.updateStatus = false
    this.HttpService.post('/user/preferences', {
      username: localStorage.getItem('username'),
      difficulty: this.selectedDifficulty,
      equipment: this._equipment,
      bodyPart: this._muscleGroups,
      workoutDuration: this.workoutDuration.value,
      timeout: this.interval.value
    })
    .then((response: HttpResponse<any>) => {
      console.log(response)
      if (response) {
        this.updateStatus = true
        this.SessionService.login(localStorage.getItem('username'), localStorage.getItem('password'), this.timeout1)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  ngOnDestroy() {
    // this._time.unsubscribe()
    // this._timeout.unsubscribe()
  }
}
