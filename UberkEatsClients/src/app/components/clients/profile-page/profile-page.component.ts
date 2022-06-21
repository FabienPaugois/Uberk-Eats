import { Component, OnInit } from '@angular/core';
import { Clients } from '../../../model/clients';
import { Roles } from '../../../model/roles';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
	public roles = Roles;
	userInfo: Clients = {
		id: '1',
		phone: '0675994028',
		name: 'Lucas',
		surname: 'Duleu',
		mail: 'lucas.duleu@hotmail.fr',
		password: '***',
		role: this.roles.client
	};

	constructor() { }

	ngOnInit(): void {
	}

}
