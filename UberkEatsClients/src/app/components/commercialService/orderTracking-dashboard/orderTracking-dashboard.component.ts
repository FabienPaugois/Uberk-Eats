import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-ordertracking-dashboard',
	templateUrl: './orderTracking-dashboard.component.html',
	styleUrls: ['./orderTracking-dashboard.component.scss']
})
export class OrderTrackingDashboardComponent implements OnInit {

	constructor(public router: Router) { }

	ngOnInit(): void {
	}

}
