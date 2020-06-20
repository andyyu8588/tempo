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

  constructor(private router:Router) { }

  ngOnInit() {
    // this.loginForm 
  }

  //handle user login with socket
  loginClicked() {
      if (!(sessionStorage.getItem('username'))) {
          let credentials = {
              email: this.loginForm.get('username').value,
              password: this.loginForm.get('password').value
          }
          this.login_err = false
          
      } else {
          sessionStorage.removeItem('username')
          this.loginClicked()
      }
  }


}
