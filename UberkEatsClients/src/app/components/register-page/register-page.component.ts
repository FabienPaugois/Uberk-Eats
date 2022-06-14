import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../services/clients-api.service';
import { Roles } from '../../model/roles';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  @Input() registerInfo = { mail: '', password: '', phone: '', name: '', surname: '' };
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  constructor(public clientsApi: ClientsApiService, public router: Router) {
  }

  ngOnInit(): void {
  }

  register(dataclient: any) {
  	this.clientsApi.register(this.registerInfo).subscribe((data: unknown) => {
  		this.router.navigate(['/']);
  	});
  }
}
