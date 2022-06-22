import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Articles } from '../../../model/articles';
import { Menus } from '../../../model/menus';
import { Order, OrdersObject } from '../../../model/order';
import { DeliveryApiService } from '../../../services/delivery-api.service';
import { OrderStore } from '../../../store/restaurantStore/order-store';

@Component({
	selector: 'app-delivery-orders-preview',
	templateUrl: './delivery-orders-preview.component.html',
	styleUrls: ['./delivery-orders-preview.component.scss']
})
export class DeliveryOrdersPreviewComponent implements OnInit {
	panelOpenState = false;
	loggedDeliveryManId = 1;
	orderData: OrdersObject;
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
	ngUnsubscribe = new Subject();
	constructor(
    public restaurantsApi: DeliveryApiService,
    private store: OrderStore
	) { }

	// for cleaning up subscriptions
	OnDestroy(): void {
		this.ngUnsubscribe.next(true);
		this.ngUnsubscribe.complete();
	}

	ngOnInit(): void {
		// subscription to the store
		this.store.state$
			.pipe(
				takeUntil(this.ngUnsubscribe))
			.subscribe(data => {
				this.orderData = data;
			});
		this.store.getOrdersFromDb();
	}

	EditAndAssignOrder(order: Order, status: boolean, deliverymanId: number) {
		this.store.editOrderStatus(order.id, status, deliverymanId);
	}

	MarkAsPickedUp(order: Order, status: boolean) {
		this.store.editOrderStatus(order.id, status);
	}
}
