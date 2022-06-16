import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from '../../../model/articles';
import { Menus } from '../../../model/menus';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-menu-pick-page',
	templateUrl: './menu-pick-page.component.html',
	styleUrls: ['./menu-pick-page.component.scss']
})
export class MenuPickPageComponent implements OnInit {

	articles: Articles[] = [
		{
			id: 1,
			name: 'Whooper',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl: '',
		},
		{
			id: 2,
			name: 'Triple Cheese',
			description: 'Lorem ipsum',
			price: 5,
			imageUrl: '',
		},
		{
			id: 3,
			name: 'Double Steakhouse',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl: '',
		},
		{
			id: 4,
			name: 'Chicken Alabama',
			description: 'Lorem ipsum',
			price: 6,
			imageUrl: '',
		},
		{
			id: 5,
			name: 'Double Cheese Bacon Vegan',
			description: 'Lorem ipsum',
			price: 10,
			imageUrl: '',
		},
		{
			id: 6,
			name: 'Potatoes',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: '',
		},
		{
			id: 7,
			name: 'Fries',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: '',
		},
		{
			id: 8,
			name: 'Coke',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: '',
		},
		{
			id: 9,
			name: 'Pepsi',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: '',
		},
	];
	menus: Menus[] = [
		{
			id: 1,
			name: 'Menu Whooper',
			description: 'Lorem ipsum',
			price: 9,
			articles: [1, 7, 8]
		},
		{
			id: 2,
			name: 'Menu Steakhouse',
			description: 'Lorem ipsum',
			price: 10,
			articles: [2, 7, 9]
		},
	];

	constructor(public clientsApi: ClientsApiService, public router: Router) { }

	ngOnInit(): void {
	}

	btnClickMenu(menu: Menus) {
		this.router.navigate(['/product-page', menu]);
	}

	btnClickArticle(article: Articles) {
		this.router.navigate(['/product-page', article]);
	}
}
