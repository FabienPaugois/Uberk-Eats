import { Component, OnInit } from '@angular/core';
import { Articles } from '../../model/articles';
import { Basket } from '../../model/basket';
import { Menus } from '../../model/menus';

@Component({
	selector: 'app-basket-page',
	templateUrl: './basket-page.component.html',
	styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {
	basket: Basket;
	totalBasketPrice: number;
	displayedArticles: Articles[] = [];
	displayedMenus: Menus[] = [];
	articles: Articles[] = [
		{
			id: 1,
			name: 'Whooper',
			description: 'Lorem ipsum',
			price: 4
		},
		{
			id: 2,
			name: 'Triple Cheese',
			description: 'Lorem ipsum',
			price: 5
		},
		{
			id: 3,
			name: 'Double Steakhouse',
			description: 'Lorem ipsum',
			price: 4
		},
		{
			id: 4,
			name: 'Chicken Alabama',
			description: 'Lorem ipsum',
			price: 6
		},
		{
			id: 5,
			name: 'Double Cheese Bacon Vegan',
			description: 'Lorem ipsum',
			price: 10
		},
		{
			id: 6,
			name: 'Potatoes',
			description: 'Lorem ipsum',
			price: 2
		},
		{
			id: 7,
			name: 'Fries',
			description: 'Lorem ipsum',
			price: 2
		},
		{
			id: 8,
			name: 'Coke',
			description: 'Lorem ipsum',
			price: 2.5
		},
		{
			id: 9,
			name: 'Pepsi',
			description: 'Lorem ipsum',
			price: 2.5
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
	basketTotalPrice = 0;

	constructor() { }

	ngOnInit(): void {
		const basketJson = localStorage.getItem('basket');
		this.basket = basketJson !== null ? JSON.parse(basketJson) : null;
		this.basket.menus.forEach( (menu) => {
			const temp = this.menus.find(menuEntry => menuEntry.id === menu.id);
			if (temp) {
				this.displayedMenus.push(temp);
				this.basketTotalPrice += (temp.price * menu.qty);
			}
		});
		this.basket.articles.forEach((article) => {
			const temp = this.articles.find(articleEntry => articleEntry.id === article.id);
			if (temp) {
				this.displayedArticles.push(temp);
				this.basketTotalPrice += (temp.price * article.qty);
			}
		});
	}
}
