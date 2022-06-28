import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasketObjects } from 'app/model/basket';
import { Clients } from 'app/model/clients';
import { ProductsIds } from 'app/model/products';
import { ClientsApiService } from 'app/services/clients-api.service';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { Store } from 'rxjs-observable-store';
import { Order, OrdersObject } from '../../model/order';

import { OrderState } from './order-state';

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<OrderState> {
	orders: Order[];
	productsIds: ProductsIds = {articlesIds : '', menusIds:''};
	concernedOrdersData: Order[];
	ownerData: Clients;
	ownerId: string;
	constructor(
		private restaurantsApi: RestaurantsApiService,
		private clientsApi: ClientsApiService,
	) {
		super(new OrderState());
	}

	async getOrdersFromDb() {
		//Don't forget to check role to adapt request
		const role = 'Client';
		if(role === 'Client'){
			const clientData = localStorage.getItem('User');
			if(clientData){
				const clientId = JSON.parse(clientData).Id;
				const response = await this.clientsApi.getOrdersHistory(clientId).toPromise();
				if(response){
					this.orders = response;
					const orders = this.orders;
					this.setState({
						...this.state,
						orders
					});
				}
			}
		}
		else if(role === 'restaurantOwner'){
			const clientData = localStorage.getItem('restaurantId');
			if(clientData){
				const restaurantId = parseInt(clientData, 10);
				const response = await this.restaurantsApi.getRestaurantOrdersHistory(restaurantId).toPromise();
				if(response){
					this.orders = response;
					const orders = this.orders;
					this.setState({
						...this.state,
						orders
					});
				}
			}
		}
		else if(role === 'deliveryman'){
			const clientData = localStorage.getItem('deliverymanId');
			if(clientData){
				const deliverymanId = parseInt(clientData, 10);
				const response = await this.restaurantsApi.getRestaurantOrdersHistory(deliverymanId).toPromise();
				if(response){
					this.orders = response;
					const orders = this.orders;
					this.setState({
						...this.state,
						orders
					});
				}
			}
		}
	}

	//Get the orders to be prepared by the restaurant and returns the concerned products ids
	// /!\ We have to handle the restaurantId
	async getOrdersToAccept(): Promise<ProductsIds>{
		const ownerId = localStorage.getItem('restaurantId');
		if(ownerId) {
			this.ownerId = ownerId;
		}
		const response = await this.restaurantsApi.getOrdersToAccept(this.ownerId).toPromise();
		if(response){
			this.orders = response;
			const orders = this.orders;
			this.setState({
				...this.state,
				orders
			});
			this.concernedOrdersData = this.state.orders.filter(order => order.status === 0 || order.status === 1);
			this.productsIds.menusIds = this.concernedOrdersData.map(order => order.menus).flat()
				.map(menus => menus.id).join(',');
			this.productsIds.articlesIds = this.concernedOrdersData.map(order => order.articles).flat()
				.map(articles => articles.id).join(',');
		}
		return this.productsIds;
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
			this.concernedOrdersData = this.state.orders.filter(order => order.status === 2 || order.status === 3);
			this.productsIds.menusIds = this.concernedOrdersData.map(order => order.menus).flat()
				.map(menus => menus.id).join(',');
			this.productsIds.articlesIds = this.concernedOrdersData.map(order => order.articles).flat()
				.map(articles => articles.id).join(',');
		}
		return this.productsIds;
	}

	editOrderStatus(orderId: string, status: boolean, deliverymanId: string = '') {
		const foundOrderInState = this.state.orders.find((entry: any) => entry._id === orderId);
		if (foundOrderInState) {
			status ? foundOrderInState.status += 1 : foundOrderInState.status = -1;
			if (status && deliverymanId !== '') {
				foundOrderInState.deliverymanId = deliverymanId;
			}
			this.restaurantsApi.editOrderStatus(foundOrderInState).subscribe((response: HttpResponse<Order>) => {
				if(response.status === 200){
					this.setState({
						...this.state, // Spread state object
						orders: [...this.state.orders] // Add to product.type property (articles or menus) the product
					});
				}
			});
		}
	}
}
