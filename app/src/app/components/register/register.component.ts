import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper
  @ViewChild('step1') step1: MatStep

  registrationForm: FormGroup
  editable: boolean = true
  hide: boolean = false
  checkUsernameUse: boolean = false
  checkPasswordValidity: boolean

  responseStatus: boolean = false

  selectedDifficulty: any = 'Intermediate'
  muscleGroups: any[] = ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']
  private _muscleGroups: any[] = []

  equipment: any[] = ['Bands', 'Barbell', 'Bench', 'Dumbbell', 'Exercise Ball', 'EZ - Bar', 'Foam Roll', 'Kettlebell', 'Machine - Cardio', 'Machine - Strength', 'Pull Bar', 'Weight Plate']
  private _equipment: any[] = []

  time: number = 10

  formatLabel(value: number) {
    this.time = value
    if (value >= 60) {
      return Math.round(value / 1);
    }

    return value;
  }

  constructor(private HttpService: HttpService, private http: HttpClient) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
        'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      }, this.checkPasswordsMatch.bind(this)),
      'checkbox': new FormControl(null, [Validators.required]),
    })
  }

  checkPasswordsMatch(control: FormControl) {
    if (this.registrationForm) {
      let pass: string = control.get('password').value
      let confirm: string = control.get('confirmPassword').value
      if (pass === confirm) {
        this.checkPasswordValidity = false
        return
      } else {
        if(control.get('confirmPassword').dirty) {
          this.checkPasswordValidity = true
        }
        return
      }
    }
  }

  checkPasswordLength() {
    if (this.registrationForm.get('passwords.password').errors && this.registrationForm.get('passwords.password').dirty) {
      if (this.registrationForm.get('passwords.password').errors['maxlength'] || this.registrationForm.get('passwords.password').errors['minlength']) {
        return true
      }
    }
  }


  checkUsernameLength() {
    if (this.registrationForm.get('username').errors && this.registrationForm.get('username').dirty) {
      if (this.registrationForm.get('username').errors['maxlength'] || this.registrationForm.get('username').errors['minlength']) {
        return true
      }
    } else {
        return false
      }
  }

  onSubmit() {
    this.HttpService.post('/user/create', {
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('passwords.password').value
    })
    .then((response: HttpResponse<any>) => {
      console.log(response)
      if (response.status == 200) {
        // localStorage.setItem('username', this.registrationForm.get('username').value)
        this.stepper.next()
      } else {
        this.responseStatus = true
      }
    })
    .catch(err => {
      console.log(err)
      this.responseStatus = true
    })
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
}