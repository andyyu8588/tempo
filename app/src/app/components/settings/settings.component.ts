import { StorageService } from './../../services/storage.service';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  responseStatus: boolean = false

  selectedDifficulty: any = 'Intermediate'
  muscleGroups: any[]
  private _muscleGroups: any[] = []

  equipment: any[]
  private _equipment: any[] = []

  time: number = 10

  formatLabel(value: number) {
    this.time = value
    if (value >= 60) {
      return Math.round(value / 1);
    }

    return value;
  }

  constructor(private HttpService: HttpService, private StorageService: StorageService) { }

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

  changeEquip(value: string) {
    if (this._equipment.includes(value)) {
      this._equipment.splice(this._equipment.indexOf(value), 1)
    } else {
      this._equipment.push(value)
    }
  }

  preferenceClick() {
    console.log(this._muscleGroups)
    this._equipment.push('Body Only')
    // if (localStorage.getItem('username')) {
      this.HttpService.post('/user/preferences', {
        username: 'andy123',
        difficulty: this.selectedDifficulty,
        equipment: this._equipment,
        bodyPart: this._muscleGroups,
        workoutDuration: this.time,
      })
      .then((response: HttpResponse<any>) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    // } else {
    //   console.log('no local')
    // }
  }

  cancel() {
  }
}
