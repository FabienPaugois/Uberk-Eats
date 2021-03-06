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
	user: any;
	articles: Articles[];
	menus: Menus[];
	order: Order;
	basketTotalPrice = 0;
	basketDiscountTotalPrice = 0;
	displayedColumns: string[] = ['name', 'price', 'qty'];
	client: any;

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
		this.menuIds = this.store.state.menus.map(menu => menu.id).join(',');
		this.articleIds = this.store.state.articles.map(menu => menu.id).join(',');
		const userData = localStorage.getItem('User');
		if(userData){
			this.user = JSON.parse(userData);
		}
		if(this.articleIds.length !== 0){
			this.clientsApi.FetchArticleData(this.articleIds).subscribe((articles: Articles[]) => {
				this.articles = articles;
				this.store.state.articles.forEach((article) => {
					const temp = this.articles.find(articleData => articleData._id === article.id);
					if(temp){
						this.basketTotalPrice += (temp.price * article.qty);
						if(this.user.UserAffiliate){
							this.basketDiscountTotalPrice = Math.round(this.basketTotalPrice * 0.95 * 100) / 100;
						}
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
						if(this.user.UserAffiliate){
							this.basketDiscountTotalPrice = Math.round(this.basketTotalPrice * 0.95 * 100) / 100;
						}
					}
				});
			});
		}
	}

	createOrderFromBasket(){
		this.deliveryAddress = this.addressForm.get('deliveryAddress')?.value;
		const clientData = localStorage.getItem('User');
		const restaurantId = localStorage.getItem('restaurantId');
		if(clientData && restaurantId){
			this.client = JSON.parse(clientData);
			this.order = {
				id: '',
				menus: this.store.state.menus,
				articles: this.store.state.articles,
				clientId: this.client.Id,
				deliveryAddress: this.deliveryAddress,
				restaurantId,
				deliverymanId: '',
				status: 0,
				timestamp : {
					createdAt: new Date(),
					pickepUpAt: new Date(0),
					deliveredAt: new Date(0),
					readyAt: new Date(0),
				}
			};
		}
		console.log(this.order);
		this.clientsApi.sendCreatedOrder(this.order).subscribe(() => {});
	}

	removeArticlesData(){
		this.store.state.articles = [];
		this.articles = [];
	}

	removeMenusData(){
		this.store.state.menus = [];
		this.menus = [];
	}
}
