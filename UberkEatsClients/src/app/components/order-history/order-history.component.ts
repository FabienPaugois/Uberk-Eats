import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order, OrdersObject } from '../../model/order';
import { ClientsApiService } from '../../services/clients-api.service';
import { OrderStore } from '../../store/restaurantStore/order-store';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
	orderHistory: OrdersObject;
	ngUnsubscribe = new Subject();

	constructor(
    private clientApi: ClientsApiService,
    public router: Router,
    private store: OrderStore
	) { }

	// for cleaning up subscriptions
	OnDestroy(): void {
		this.ngUnsubscribe.next(true);
		this.ngUnsubscribe.complete();
	}

	async ngOnInit(): Promise<void> {
		// subscription to the store
		this.store.state$
			.pipe(
				takeUntil(this.ngUnsubscribe))
			.subscribe(data => {
				this.orderHistory = data;
			});
		await this.store.getOrdersFromDb();
		this.hideLoader();
	}

	btnClickOrder(order: any) {
		const id = order._id;
		const pos = this.orderHistory.orders.indexOf(order);
		this.router.navigate(['/order-preview', {id, pos}]);
	}

	hideLoader() {
		const loader = document.getElementById('loader');
		if (loader !== null) {
			loader.hidden = true;
		}
	}
}
