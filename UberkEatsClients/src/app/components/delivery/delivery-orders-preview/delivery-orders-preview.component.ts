import { Component, OnInit } from '@angular/core';
import { ProductsIds } from 'app/model/products';
import { ClientsApiService } from 'app/services/clients-api.service';
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
	loggedDeliveryManId = '';
	orderData: OrdersObject;
	articles: Articles[];
	menus: Menus[];
	productsIds: ProductsIds = {articlesIds : '', menusIds:''};
	ngUnsubscribe = new Subject();
	constructor(
    public restaurantsApi: DeliveryApiService,
	private clientsApi: ClientsApiService,
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
				this.orderData = data;
			});
		const deliverymanId = localStorage.getItem('deliverymanId');
		if(deliverymanId){
			this.loggedDeliveryManId = deliverymanId;
		}
		//Get Ids of concerned products to retreive their data for display
		let receivedArticles = false; let receivedMenus = false;
		this.productsIds = await this.store.getOrdersToBePicked();
		if(this.productsIds.articlesIds){
			this.clientsApi.FetchArticleData(this.productsIds.articlesIds).subscribe((articles: Articles[]) => {
				this.articles = articles;
				receivedArticles = true;
				if(receivedArticles && receivedMenus){
					this.hideLoader();
				}
			});
		}
		if(this.productsIds.menusIds){
			this.clientsApi.FetchMenusData(this.productsIds.menusIds).subscribe((menus: Menus[]) => {
				this.menus = menus;
				receivedMenus = true;
				if(receivedArticles && receivedMenus){
					this.hideLoader();
				}
			});
		}
	}

	editAndAssignOrder(order: any, status: boolean, deliverymanId: string) {
		this.store.editOrderStatus(order._id, status, deliverymanId);
	}

	markAsPickedUp(order: any, status: boolean) {
		this.store.editOrderStatus(order._id, status);
	}

	hideLoader() {
		const loader = document.getElementById('loader');
		if (loader !== null) {
			loader.hidden = true;
		}
	}
}
