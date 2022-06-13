import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../services/clients-api.service';
@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	@Input() loginInfo = { mail: '', password: '' };
	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void { }
	authenticate(dataclient: any) {
		this.clientsApi.Authenticate(this.loginInfo).subscribe((data: {}) => {
			//this.router.navigate(['./']);
		});
	}


}
