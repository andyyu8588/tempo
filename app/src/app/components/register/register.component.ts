import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  editable: boolean = true
  hide: boolean = false
  registrationForm: FormGroup

  constructor(private HttpService: HttpService, private http: HttpClient) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)], ),
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

  checkPasswordValidity

  

  checkPasswordLength() {

  }

  checkUsernameUse() {

  }

  checkUsernameLength() {

  }

  registerClick() {

  }

  onSubmit() {
    this.HttpService.post('/user/create', {
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('passwords.password').value
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }
}