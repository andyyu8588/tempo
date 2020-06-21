import { SessionService } from './../../services/session.service';
import { StorageService } from './../../services/storage.service';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
    })
  login_err: boolean = false
  hide: boolean = true

  responseStatus: boolean = false
  responseMessage: string = ''

  constructor(private router: Router,
              private HttpService: HttpService,
              private SessionService: SessionService) { }

  ngOnInit() {
    // this.loginForm 
  }

  //handle user login
  loginClicked() {
    if (!(localStorage.getItem('username'))) {
      this.responseMessage, this.responseStatus = null
      let credentials = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      }
      this.HttpService.get('/user/login', credentials)
      .then((response: any) => {
        console.log(response)
        if (response.status == 200) {
          this.login_err = false
          this.SessionService.login(
            credentials.username,
            credentials.password
          )
          this.SessionService.getTimeout()
        } else {
          this.responseStatus = true
          this.responseMessage = response.message
          this.login_err = true
        }
      })
      .catch(err => {
        this.login_err = true
        this.responseStatus = true
        this.responseMessage = err.message
        console.log(err)
      })
    } else {
      localStorage.clear()
      this.loginClicked()
    }
  }


}
