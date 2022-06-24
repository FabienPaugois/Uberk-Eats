import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-restaurant-list',
	templateUrl: './restaurant-list.component.html',
	styleUrls: ['./restaurant-list.component.scss']
})
export class ConnectionLogsListComponent implements OnInit {

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void {

	}

	btnClick() {
	}

	getConnectionLogs() {
    this.clientsApi.getConnectionLogs().subscribe((data: unknown) => {
		});
	}
}
