import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../../services/clients-api.service';
import { AuthToken } from '../../../model/authToken';
import { ConnectionLogs } from '../../../model/connectionLogs';
import { DatePipe } from '@angular/common';
import { Clients } from 'app/model/clients';
import { DefaultRoute } from 'app/model/defaultRoute';
import { ErrorSheme } from 'app/model/error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup; // variable of type FormGroup is created
  public loading = false;
  public error: ErrorSheme = { isError: false, errorMsg: '' };

  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  authenticate() {
    if (this.loginForm.invalid) { return; } // Return if form is invalid
    this.loading = true; // Init loading
    const co: ConnectionLogs = { userId: NaN, date: new Date(), description: '' };
    this.clientsApi.authenticate({
      mail: this.form.mail.value,
      password: this.form.password.value
    }).subscribe((data: AuthToken) => { // Send the login request
      this.loading = false;
      this.error.isError = false;
      localStorage.setItem('JWT', data.jwtoken); // Store the returned token into the localStorage
      localStorage.setItem('User', JSON.stringify(data.user));

      co.userId = JSON.parse('' + localStorage.getItem('User')).Id;
      co.date = new Date();
      co.description = 'User logged in succesfully';
      this.clientsApi.postConnectionLogs(co).subscribe((log: ConnectionLogs) => { });
      this.router.navigate([DefaultRoute.Client]);
    }, (error: any) => {
      this.loading = false;
      this.error = { isError: true, errorMsg: error.errorMsg };
      co.userId = NaN;
      co.date = new Date();
      co.description = 'User with login mail \'' + (
        JSON.parse(localStorage.getItem('User') as string) as Clients
      ).mail + '\' could not login. Error : ' + error.errorMsg;
      this.clientsApi.postConnectionLogs(co).subscribe();
    });
  }

  redirectToRegister() {
    this.router.navigate(['register-page']);
  }
}
