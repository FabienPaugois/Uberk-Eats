import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Clients } from 'app/model/clients';
import { Order, OrderProducts } from 'app/model/order';
import { ClientsApiService } from 'app/services/clients-api.service';
import { BasketStore } from 'app/store/articleStore/basket-store';
import { Articles } from '../../model/articles';
import { Basket } from '../../model/basket';
import { Menus } from '../../model/menus';

@Component({
	selector: 'app-basket-page',
	templateUrl: './basket-page.component.html',
	styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {
	@Input() deliveryAddress: string;
	basket: Basket;
	totalBasketPrice: number;
	menuQtyArr: [];
	menuIds = '';
	articleQtyArr: [];
	articleIds = '';
	articles: Articles[];
	menus: Menus[];
	order: Order;
	basketTotalPrice = 0;
	client: Clients;

	public addressForm: FormGroup; // variable of type FormGroup is created
	constructor(
		public store: BasketStore,
		private clientsApi: ClientsApiService,
		private fb: FormBuilder
	) {
		//Forms element defined below
		this.addressForm = this.fb.group({deliveryAddress: ''});
	}

	ngOnInit(): void {
		this.store.state.articles.forEach(article => {
			this.store.state.articles.length !== 1 ? this.articleIds += article.id + ',' : this.articleIds = article.id;
		});
		this.store.state.menus.forEach(menu => {
			this.store.state.menus.length !== 1 ? this.menuIds += menu.id + ',' : this.menuIds = menu.id;
		});
		if(this.articleIds.length !== 0){
			this.clientsApi.FetchArticleData(this.articleIds).subscribe((articles: Articles[]) => {
				this.articles = articles;
				this.store.state.articles.forEach((article) => {
					const temp = this.articles.find(articleData => articleData._id === article.id);
					if(temp){
						this.basketTotalPrice += (temp.price * article.qty);
					}
				});
			});
		}
		if(this.menuIds.length !== 0){
			this.clientsApi.FetchMenusData(this.menuIds).subscribe((menus: Menus[]) => {
				this.menus = menus;
				this.store.state.menus.forEach( (menu) => {
					const temp = this.menus.find(menuData => menuData._id === menu.id);
					if(temp){
						this.basketTotalPrice += (temp.price * menu.qty);
					}
				});
			});
		}
	}

	createOrderFromBasket(){
		this.deliveryAddress = this.addressForm.get('deliveryAddress')?.value;
		const clientData = localStorage.getItem('User');
		if(clientData){
			this.client = JSON.parse(clientData);
		}
		this.order = {
			id: '',
			menus: [],
			articles: [],
			clientId: this.client.id,
			deliveryAddress: this.deliveryAddress,
			restaurantId: '',
			deliverymanId: '',
			status: 0,
			timestamp : {
				createdAt: new Date(Date.now()),
				pickepUpAt: new Date(),
				deliveredAt: new Date(),
				readyAt: new Date(),
			}
		};
		const menus: OrderProducts[] = [];
		const articles: OrderProducts[] = [];
		this.store.state.menus.forEach(menu => {
			menus.push({id: menu.id, qty: menu.qty});
		});
		this.store.state.articles.forEach(article => {
			articles.push({id: article.id, qty: article.qty});
		});
		this.clientsApi.sendCreatedOrder(this.order).subscribe(() => {});
	}
}
