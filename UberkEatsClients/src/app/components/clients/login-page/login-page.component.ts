import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthToken } from '../../../model/authToken';
import { ConnectionLogs } from '../../../model/connectionLogs';
import { DatePipe } from '@angular/common';

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
			mail: '',
			password: ''
		});
	}
	ngOnInit(): void { }
	authenticate(dataclient: any) {
		this.loginInfo.mail = this.loginForm.get('mail')?.value;
		this.loginInfo.password = Md5.hashStr(this.loginForm.get('password')?.value);
		const co: ConnectionLogs = { userId: NaN, date: new Date(), description:''};
		this.clientsApi.authenticate(this.loginInfo).subscribe((data: AuthToken) => { // Send the login request
			localStorage.setItem('JWT', data.jwtoken); // Store the returned token into the localStorage
			localStorage.setItem('User', JSON.stringify(data.user));

			co.userId = JSON.parse('' + localStorage.getItem('User')).Id;
			co.date = new Date();
			co.description = 'User logged in succesfully';
			this.clientsApi.postConnectionLogs(co).subscribe((log: ConnectionLogs) => { });

		}, (error: any) => {

			co.userId = NaN;
			co.date = new Date();
			co.description = 'User with login mail \'' + JSON.parse('' + localStorage.getItem('User')).Mail + '\' could not login. Error : '
        + error;
			this.clientsApi.postConnectionLogs(co).subscribe((log: ConnectionLogs) => { });
		});
	}
}
