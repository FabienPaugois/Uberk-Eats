import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientsApiService } from './services/clients-api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'UberkEatsClients';

	constructor(
		public router: Router,
		public clientsApiService: ClientsApiService,
		public authGuard: AuthGuard
	) { }
}
