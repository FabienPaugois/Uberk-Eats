import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from '../../../model/basket';
import { Restaurants } from '../../../model/restaurants';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-restaurant-list',
	templateUrl: './restaurant-list.component.html',
	styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
	basket: Basket = { menus: [], articles: []};
	restaurants: Restaurants[] = [];

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void {
		this.getRestaurants();
	}

	btnClick() {
		localStorage.clear();
		localStorage.setItem('basket', JSON.stringify(this.basket));
		this.router.navigateByUrl('/menu-pick-page');
	}

	getRestaurants() {
		this.clientsApi.getRestaurants().subscribe((restaurants: Restaurants[]) => {
			this.restaurants = restaurants;
		});
	}
}
