import { Component, OnInit } from '@angular/core';
import { Order, OrdersObject } from '../../model/order';
import { ClientsApiService } from '../../services/clients-api.service';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
	orderHistory: OrdersObject = {orders : []};
	date = '2017-11-27T09:10:00';
	orders: Order[] = [
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

	constructor(
    public clientApi: ClientsApiService
	) { }

	ngOnInit(): void {
		/*this.clientApi.getOrdersHistory().subscribe(orders => {
      this.orderHistory = orders
    });*/
		this.orderHistory.orders = this.orders;
	}
}
