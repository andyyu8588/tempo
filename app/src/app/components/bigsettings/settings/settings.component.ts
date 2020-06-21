import { TimerService } from './../../../services/timer.service';
import { ElectronService } from 'ngx-electron';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  responseStatus: boolean = false
  updateStatus: boolean = false

  selectedDifficulty: string = 'Beginner'

  muscleGroups: any[]
  private _muscleGroups: any[] = []

  equipment: any[]
  private _equipment: any[] = []

  time: number = 10
  timeout: number = 60

  formatLabel(value: number) {
    this.time = value
    if (value >= 60) {
      return Math.round(value / 1);
    }
    return value;
  }

  onStartup: boolean

  constructor(private HttpService: HttpService,
              private ElectronService: ElectronService,
              private TimerService: TimerService) {
    this.onStartup = this.ElectronService.ipcRenderer.sendSync('startup')

    this.HttpService.get('/user', {username: localStorage.getItem('username')})
    .then((user: {[key: string]: any}) => {
      let obj = user.user[0]
      this.selectedDifficulty = obj.difficulty
      this._equipment = obj.equipment
      this._muscleGroups = obj.bodyPart
      this.time = obj.workoutDuration
    })
    .catch(err => {
      this.responseStatus = true
    })
  }

  ngOnInit(): void {
    this.muscleGroups = ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']
    this.equipment = ['Bands', 'Barbell', 'Bench', 'Dumbbell', 'Exercise Ball', 'EZ - Bar', 'Foam Roll', 'Kettlebell', 'Machine - Cardio', 'Machine - Strength', 'Pull Bar', 'Weight Plate']

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
      username: 'andy123',
      difficulty: this.selectedDifficulty,
      equipment: this._equipment,
      bodyPart: this._muscleGroups,
      workoutDuration: this.time,
    })
    .then((response: HttpResponse<any>) => {
      console.log(response)
      if (response) {
        this.updateStatus = true
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
