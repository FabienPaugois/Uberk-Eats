import { Injectable } from '@angular/core';
import { BasketObjects } from 'app/model/basket';
import { Store } from 'rxjs-observable-store';
import { Order } from '../../model/order';

import { OrderState } from './order-state';

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<OrderState> {

	constructor() {
		super(new OrderState());
	}

	getOrdersFromDb() {
		const date = '2017-11-27T09:10:00';
		const orders: Order[] = [
			{
				id: 0,
				articles: [{ id: 1, qty: 2 }, { id: 7, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }],
				clientId: 1,
				deliveryAddress: '4 rue de la Libération',
				restaurantId: 1,
				status: 0,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
			{
				id: 1,
				articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 2 }],
				clientId: 1,
				deliveryAddress: '16 rue de la Libération',
				restaurantId: 1,
				status: 1,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
			{
				id: 2,
				articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 2 }],
				clientId: 1,
				deliveryAddress: '16 rue de la Libération',
				restaurantId: 1,
				status: 2,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
			{
				id: 3,
				articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 2 }],
				clientId: 1,
				deliveryAddress: '16 rue de la Libération',
				restaurantId: 1,
				status: 3,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
			{
				id: 4,
				articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 2 }],
				clientId: 1,
				deliveryAddress: '16 rue de la Libération',
				restaurantId: 1,
				status: 4,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
			{
				id: 5,
				articles: [{ id: 1, qty: 2 }, { id: 4, qty: 1 }, { id: 8, qty: 2 }],
				menus: [{ id: 1, qty: 2 }],
				clientId: 1,
				deliveryAddress: '16 rue de la Libération',
				restaurantId: 1,
				status: 5,
				timestamp: {
					createdAt: new Date(date),
					pickepUpAt: new Date(date),
					deliveredAt: new Date(date),
					readyAt: new Date(date)
				}
			},
		];
		this.setState({
			...this.state,
			orders
		});
	}

	editOrderStatus(orderId: number, status: boolean) {
		const foundOrderInState = this.state.orders.find(entry => entry.id === orderId);
		if (foundOrderInState) { status ? foundOrderInState.status += 1 :  foundOrderInState.status = -1; }
		this.setState({
			...this.state, // Spread state object
			orders: [...this.state.orders] // Add to product.type property (articles or menus) the product
		});
		this.state.orders.forEach(order => {
			console.log(order.status);
		});

	}
}
