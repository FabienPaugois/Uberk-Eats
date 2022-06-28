import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../services/clients-api.service';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void {
	}

}
