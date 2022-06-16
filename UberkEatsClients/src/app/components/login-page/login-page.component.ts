import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../services/clients-api.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	@Input() loginInfo = { mail: '', password: '' };

  public loginForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.loginForm = this.fb.group({
      Mail: '',
      Password: ''
    });
  }
	ngOnInit(): void { }
  authenticate(dataclient: any) {
    this.loginInfo.mail = this.loginForm.get('Mail')?.value;
    this.loginInfo.password = Md5.hashStr(this.loginForm.get('Password')?.value);
    this.clientsApi.authenticate(this.loginInfo).subscribe((data: string) => { // Send the login request
      localStorage.setItem("JWT", data); // Store the returned token into the localStorage
		});
	}


}
