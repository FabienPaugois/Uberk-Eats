import { Component, OnInit } from '@angular/core';
import { Articles } from '../../../model/articles';
import { Menus } from '../../../model/menus';
import { Orders } from '../../../model/order';

@Component({
	selector: 'app-order-preview',
	templateUrl: './order-preview.component.html',
	styleUrls: ['./order-preview.component.scss']
})
export class OrderPreviewComponent implements OnInit {
	date = '2017-11-27T09:10:00';
	orders: Orders[] = [
		{
			id: 0,
			articles: [{ id: 1, qty: 2 }, { id: 7, qty: 1 }, { id: 8, qty: 2 }],
			menus: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }],
			clientId: 1,
			deliveryAddress: '4 rue de la Libération',
			restaurantId: 1,
			status: 0,
			timestamp: {
				createdAt: new Date(this.date),
				pickepUpAt: new Date(this.date),
				deliveredAt: new Date(this.date),
				readyAt: new Date(this.date)
			}
		},
		{
			id: 1,
			articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
			menus: [{ id: 1, qty: 2 }],
			clientId: 1,
			deliveryAddress: '16 rue de la Libération',
			restaurantId: 1,
			status: 0,
			timestamp: {
				createdAt: new Date(this.date),
				pickepUpAt: new Date(this.date),
				deliveredAt: new Date(this.date),
				readyAt: new Date(this.date)
			}
		},
	];
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

	constructor() { }

	ngOnInit(): void {

	}

	acceptOrder() {

	}

	refuseOrder() {

	}

}
