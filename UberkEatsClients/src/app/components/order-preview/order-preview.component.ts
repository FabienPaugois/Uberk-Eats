import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs';
import { Order, OrdersObject } from '../../model/order';
import { OrderStore } from '../../store/restaurantStore/order-store';

@Component({
	selector: 'app-order-preview',
	templateUrl: './order-preview.component.html',
	styleUrls: ['./order-preview.component.scss']
})
export class OrderPreviewComponent implements OnInit {
	orderData: Order;
	orders: OrdersObject;
	routeSub: Subscription;
	articleSub: Subscription;
	menuSub: Subscription;
	orderId: number;
	pos: number;
	ngUnsubscribe = new Subject();
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'determinate';
	value = 0;
	statusMessage = '';

	constructor(
    private activatedRoute: ActivatedRoute,
    private store: OrderStore
	) { }

	ngOnInit(): void {
		this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
			this.orderId = params.id;
			this.pos = parseInt(params.pos,10) + 1;
		});
		console.log(this.orderId);
		// subscription to the store
		this.store.state$
			.pipe(
				takeUntil(this.ngUnsubscribe))
			.subscribe(data => {
				this.orders = data;
			});
		this.store.getOrdersFromDb();

		const foundOrder = this.store.state.orders.find((order: any) => order._id === this.orderId);
		if(foundOrder){
			this.orderData = foundOrder;
		}
		if (this.orderData) {
			switch (this.orderData.status) {
			case 0:
				this.value = 1;
				this.statusMessage = 'Votre commande a été envoyée au restaurateur';
				break;
			case 1:
				this.value = 20;
				this.statusMessage = 'La commande a été acceptée par le restaurateur';
				break;
			case 2:
				this.value = 40;
				this.statusMessage = 'Votre commande a été préparée par le restaurateur et en attente d\'un livreur';
				break;
			case 3:
				this.value = 60;
				this.statusMessage = 'Le livreur est entrain de récupérer votre commande';
				break;
			case 4:
				this.value = 80;
				this.statusMessage = 'Le livreur est en route vers le point de livraison';
				break;
			case 5:
				this.value = 100;
				this.statusMessage = 'La commande a été livrée';
				break;
			case -1:
				this.value = 0;
				this.statusMessage = 'La commande a été annulée';
			}
		}
		console.log(this.orderData);
	}

	// for cleaning up subscriptions
	OnDestroy(): void {
		this.ngUnsubscribe.next(true);
		this.ngUnsubscribe.complete();
	}
}
