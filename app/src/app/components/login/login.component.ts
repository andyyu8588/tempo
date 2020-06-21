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

  constructor(private router: Router, private HttpService: HttpService) { }

  ngOnInit() {
    // this.loginForm 
  }

  //handle user login
  loginClicked() {
    if (!(localStorage.getItem('username'))) {
      let credentials = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      }
      this.HttpService.get('/user/login', credentials)
      .then((response: any) => {
        console.log(response)
        if (response.status == 200) {
          this.login_err = false
          localStorage.setItem('username', this.loginForm.get('username').value)
          localStorage.setItem('password', this.loginForm.get('password').value)
        } else {
          this.responseStatus = true
          this.responseMessage = response
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
