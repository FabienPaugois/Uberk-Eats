import { Component, OnInit } from '@angular/core';
import { BasketStore } from 'app/store/articleStore/basket-store';
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
	menuQtyArr: number[] = [];
	articleQtyArr: number[] = [];
	displayedArticles: Articles[] = [];
	displayedMenus: Menus[] = [];
	articles: Articles[] = [
		{
			id: 1,
			name: 'Whooper',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl:''
		},
		{
			id: 2,
			name: 'Triple Cheese',
			description: 'Lorem ipsum',
			price: 5,
			imageUrl: ''
		},
		{
			id: 3,
			name: 'Double Steakhouse',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl: ''
		},
		{
			id: 4,
			name: 'Chicken Alabama',
			description: 'Lorem ipsum',
			price: 6,
			imageUrl: ''
		},
		{
			id: 5,
			name: 'Double Cheese Bacon Vegan',
			description: 'Lorem ipsum',
			price: 10,
			imageUrl: ''
		},
		{
			id: 6,
			name: 'Potatoes',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: ''
		},
		{
			id: 7,
			name: 'Fries',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: ''
		},
		{
			id: 8,
			name: 'Coke',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: ''
		},
		{
			id: 9,
			name: 'Pepsi',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: ''
		},
	];
	menus: Menus[] = [
		{
			id: 1,
			name: 'Menu Whooper',
			description: 'Lorem ipsum',
			price: 9,
			articles: [1, 7, 8],
			imageUrl: ''
		},
		{
			id: 2,
			name: 'Menu Steakhouse',
			description: 'Lorem ipsum',
			price: 10,
			articles: [2, 7, 9],
			imageUrl: ''
		},
	];
	basketTotalPrice = 0;

	constructor(public store: BasketStore) { }

	ngOnInit(): void {
		this.store.state.menus.forEach( (menu) => {
			const temp = this.menus.find(menuEntry => menuEntry.id === menu.id);
			if (temp) {
				this.displayedMenus.push(temp);
				this.basketTotalPrice += (temp.price * menu.qty);
				this.menuQtyArr[menu.id] = menu.qty;
				console.log(this.menuQtyArr);
			}
		});
		this.store.state.articles.forEach((article) => {
			const temp = this.articles.find(articleEntry => articleEntry.id === article.id);
			if (temp) {
				this.displayedArticles.push(temp);
				this.basketTotalPrice += (temp.price * article.qty);
			}
		});
	}
}
