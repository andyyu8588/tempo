import { SessionService } from './../../services/session.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './../../services/storage.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild, Output, Input, OnDestroy, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStep, MatStepper, MatHorizontalStepper } from '@angular/material/stepper';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('stepper') stepper: MatHorizontalStepper
  @ViewChild('step1') step1: MatStep
  
  registrationForm: FormGroup
  editable: boolean = true
  hide: boolean = true
  checkUsernameUse: boolean = false
  checkPasswordValidity: boolean

  responseStatus: boolean = false
  responseMessage: string

  constructor(private HttpService: HttpService,
              private SessionService: SessionService) {
   }

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

  ngAfterContentInit() {
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
    .then((response: any) => {
      if (!response.error) {
        localStorage.setItem('username', this.registrationForm.get('username').value)
        localStorage.setItem('password', this.registrationForm.get('passwords.password').value)
        this.stepper.next()
      } else {
        this.responseStatus = true
        this.responseMessage = response.message
      }
    })
    .catch(err => {
      console.log(err)
      this.responseStatus = true
    })
  }

  resetState: boolean = true
  reset() {
    console.log(this.stepper)
    this.resetState = false
    setTimeout(() => {
      this.resetState = true
    }, 500)
  }

  // switch between login and register
  toggleState() {
    this.SessionService.onStateToggle(true)
  }

  ngOnDestroy() {
  }
}
