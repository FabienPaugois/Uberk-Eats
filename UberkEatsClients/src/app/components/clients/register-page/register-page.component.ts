import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Roles } from '../../../model/roles';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthToken } from '../../../model/authToken';
import { ErrorSheme } from 'app/model/error';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  @Input() registerInfo = { mail: '', password: '', phone: '', name: '', surname: '', affiliateMail:'', role: '' };
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  
  public error: ErrorSheme = {isError: false, errorMsg: ''}


  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
  	// Form element defined below

  	this.registerForm = this.fb.group({
  		name: '',
  		surname: '',
  		phone: '',
  		password: '',
  		mail: '',
  		affiliateMail:'',
  		role: ''
  	});
  }

  ngOnInit(): void {
  }

  register(dataclient: any) {
  	this.registerInfo.name = this.registerForm.get('name')?.value;
  	this.registerInfo.surname = this.registerForm.get('surname')?.value;
  	this.registerInfo.phone = this.registerForm.get('phone')?.value;
  	this.registerInfo.password = Md5.hashStr(this.registerForm.get('password')?.value);
  	this.registerInfo.mail = this.registerForm.get('mail')?.value;
  	this.clientsApi.register(this.registerInfo, this.registerForm.get('role')?.value, this.registerForm.get('affiliateMail')?.value)
  		.subscribe((data: AuthToken) => {
  		// Send the login request
  		localStorage.setItem('JWT', data.jwtoken); // Store the returned token into the localStorage
  		localStorage.setItem('User', JSON.stringify(data.user));
  		this.router.navigate(['/']);
  	}, (error: any) => {
		this.error = {isError: true, errorMsg: error.errorMsg}
	});
  }
}
