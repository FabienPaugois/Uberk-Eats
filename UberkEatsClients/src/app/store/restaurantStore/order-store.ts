import { Injectable } from '@angular/core';
import { BasketObjects } from 'app/model/basket';
import { ProductsIds } from 'app/model/products';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { Store } from 'rxjs-observable-store';
import { Order, OrdersObject } from '../../model/order';

import { OrderState } from './order-state';

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<OrderState> {
	orders: Order[];
	productsIds: ProductsIds = {articlesIds : '', menusIds:''};
	constructor(
		private restaurantsApi: RestaurantsApiService,
	) {
		super(new OrderState());
	}

	getOrdersFromDb() {
	}

	//Get the orders to be pickep by delivery man and returns the concerned products ids
	async getOrdersToBePicked(): Promise<ProductsIds>{
		const response = await this.restaurantsApi.getOrdersToBePicked().toPromise();
		if(response){
			this.orders = response;
			const orders = this.orders;
			this.setState({
				...this.state,
				orders
			});
			this.state.orders.forEach(order => {
				order.menus.forEach(menu => {
					order.menus.length !== 1 ? this.productsIds.menusIds += menu.id + ',' : this.productsIds.menusIds = menu.id;
				});
				order.articles.forEach(article => {
					order.articles.length !== 1 ?
						this.productsIds.articlesIds += article.id + ',' :
						this.productsIds.articlesIds = article.id;
				});
			});
		}
		return this.productsIds;
	}

	editOrderStatus(orderId: string, status: boolean, deliverymanId: string = '') {
		const foundOrderInState = this.state.orders.find(entry => entry.id === orderId);
		if (foundOrderInState) {
			status ? foundOrderInState.status += 1 : foundOrderInState.status = -1;
			if (status && deliverymanId !== '') {
				foundOrderInState.deliverymanId = deliverymanId;
			}
		}
		this.setState({
			...this.state, // Spread state object
			orders: [...this.state.orders] // Add to product.type property (articles or menus) the product
		});
	}
}
