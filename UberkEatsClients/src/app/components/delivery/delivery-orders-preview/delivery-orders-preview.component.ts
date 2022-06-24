import { Component, OnInit } from '@angular/core';
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
	articles: Articles[] = [
		{
			_id: '1',
			name: 'Whooper',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl: '',
		},
		{
			_id: '2',
			name: 'Triple Cheese',
			description: 'Lorem ipsum',
			price: 5,
			imageUrl: '',
		},
		{
			_id: '3',
			name: 'Double Steakhouse',
			description: 'Lorem ipsum',
			price: 4,
			imageUrl: '',
		},
		{
			_id: '4',
			name: 'Chicken Alabama',
			description: 'Lorem ipsum',
			price: 6,
			imageUrl: '',
		},
		{
			_id: '5',
			name: 'Double Cheese Bacon Vegan',
			description: 'Lorem ipsum',
			price: 10,
			imageUrl: '',
		},
		{
			_id: '6',
			name: 'Potatoes',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: '',
		},
		{
			_id: '7',
			name: 'Fries',
			description: 'Lorem ipsum',
			price: 2,
			imageUrl: '',
		},
		{
			_id: '8',
			name: 'Coke',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: '',
		},
		{
			_id: '9',
			name: 'Pepsi',
			description: 'Lorem ipsum',
			price: 2.5,
			imageUrl: '',
		},
	];
	menus: Menus[] = [
		{
			_id: '1',
			name: 'Menu Whooper',
			description: 'Lorem ipsum',
			price: 9,
			articles: [1, 7, 8],
			imageUrl: ''
		},
		{
			_id: '2',
			name: 'Menu Steakhouse',
			description: 'Lorem ipsum',
			price: 10,
			articles: [2, 7, 9],
			imageUrl: ''
		},
	];
	menuIds: string;
	articleIds: string;
	ngUnsubscribe = new Subject();
	constructor(
    public restaurantsApi: DeliveryApiService,
	private clientsApi : ClientsApiService,
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
		this.store.state.orders.forEach(order => {
			order.menus.forEach(menu => {
				order.menus.length !== 1 ? this.menuIds += menu.id + ',' : this.menuIds = menu.id;
			});
			order.articles.forEach(article => {
				order.articles.length !== 1 ? this.articleIds += article.id + ',' : this.articleIds = article.id
			})
		})
		console.log(this.articleIds +  '----' + this.menuIds)
		if(this.articleIds){
			this.clientsApi.FetchArticleData(this.articleIds).subscribe((articles: Articles[]) => {
				this.articles = articles;
				console.log(this.articles)
			});
		}
		if(this.menuIds){
			this.clientsApi.FetchMenusData(this.menuIds).subscribe((menus: Menus[]) => {
				this.menus = menus;
				console.log(this.menus)
			});
		}
	}

	editAndAssignOrder(order: Order, status: boolean, deliverymanId: string) {
		this.store.editOrderStatus(order.id, status, deliverymanId);
	}

	markAsPickedUp(order: Order, status: boolean) {
		this.store.editOrderStatus(order.id, status);
	}
}
