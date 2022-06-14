import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurants } from '../../model/restaurants';
import { ClientsApiService } from '../../services/clients-api.service';

@Component({
	selector: 'app-restaurant-list',
	templateUrl: './restaurant-list.component.html',
	styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
	restaurants: Restaurants[] = [
		{
			id: '1',
			phone: '0675994028',
			name: 'MacDonald\'s',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Fast food']
		},
		{
			id: '2',
			phone: '0675994028',
			name: 'Burger King',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Fast food']
		},
		{
			id: '3',
			phone: '0675994028',
			name: 'KFC',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Fast food']
		},
		{
			id: '4',
			phone: '0675994028',
			name: 'Friterie Sensas',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Friterie', 'Fast food']
		},
		{
			id: '5',
			phone: '0675994028',
			name: 'La pate al\'dente',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Italien']
		},
		{
			id: '5',
			phone: '0675994028',
			name: 'Le dragon lotus',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Chinois']
		},
		{
			id: '6',
			phone: '0675994028',
			name: 'Le Mykonos',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Grec']
		},
		{
			id: '6',
			phone: '0675994028',
			name: 'Tapas ta carte',
			address: '4 rue de la Libération',
			description: 'Texte de description',
			types: ['Tapas']
		}
	];

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void {
	}

	btnClick() {
		this.router.navigateByUrl('/menu-pick-page');
	}

	getRestaurants() {
		this.clientsApi.getRestaurants().subscribe((data: unknown) => {

		});
	}
}
