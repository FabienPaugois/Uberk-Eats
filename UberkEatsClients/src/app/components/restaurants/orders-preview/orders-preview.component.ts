import { Component, OnInit } from '@angular/core';
import { ProductsIds } from 'app/model/products';
import { ClientsApiService } from 'app/services/clients-api.service';
import { Subject, takeUntil } from 'rxjs';
import { Articles } from '../../../model/articles';
import { Menus } from '../../../model/menus';
import { Notifications } from '../../../model/notifications';
import { Order, OrdersObject } from '../../../model/order';
import { RestaurantsApiService } from '../../../services/restaurants-api.service';
import { NotificationsApiService } from '../../../services/notifications-api.service';
import { OrderStore } from '../../../store/restaurantStore/order-store';

@Component({
	selector: 'app-orders-preview',
	templateUrl: './orders-preview.component.html',
	styleUrls: ['./orders-preview.component.scss']
})
export class OrdersPreviewComponent implements OnInit {
	panelOpenState = false;
	date = '2017-11-27T09:10:00';
	orderData: OrdersObject;
	articles: Articles[];
	menus: Menus[];
	productsIds: ProductsIds = { articlesIds: '', menusIds: '' };
	ngUnsubscribe = new Subject();

	constructor(
    public restaurantsApi: RestaurantsApiService,
    private clientsApi: ClientsApiService,
    private store: OrderStore,
    private notifsApi: NotificationsApiService,
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
		let receivedArticles = false; let receivedMenus = false;
		this.productsIds = await this.store.getOrdersToAccept();
		if (this.productsIds.articlesIds) {
			this.clientsApi.FetchArticleData(this.productsIds.articlesIds).subscribe((articles: Articles[]) => {
				this.articles = articles;
				receivedArticles = true;
				if(receivedArticles && receivedMenus){
					this.hideLoader();
				}
			});
		}
		if (this.productsIds.menusIds) {
			this.clientsApi.FetchMenusData(this.productsIds.menusIds).subscribe((menus: Menus[]) => {
				this.menus = menus;
				receivedMenus = true;
				if(receivedArticles && receivedMenus){
					this.hideLoader();
				}
			});
		}
	}

	EditOrderStatus(order: any, status: boolean) {
		this.store.editOrderStatus(order._id, status);
		const notif: Notifications = {
			userId: JSON.parse(localStorage.getItem('User') as string).Id,
			title: status ? 'Votre commande a été acceptée.' : 'Votre commande a été refusée.',
			content: status ? 'Vous serez notifiés lorsque le livreur la prendra en charge' : 'Veuillez repasser une commande.',
			createdAt: new Date(),
			hasBeenRead: false
		};
		this.notifsApi.postNewNotification(notif);
	}

	hideLoader() {
		const loader = document.getElementById('loader');
		if (loader !== null) {
			loader.hidden = true;
		}
	}
}
