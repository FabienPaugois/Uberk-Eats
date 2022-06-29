import { Injectable } from '@angular/core';
import { Restaurants } from 'app/model/restaurants';
import { ClientsApiService } from 'app/services/clients-api.service';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { Store } from 'rxjs-observable-store';
import { Articles } from '../../model/articles';
import { BasketObjectsType } from '../../model/basket';
import { Menus } from '../../model/menus';
import { ProductsIds, ProductsObjects } from '../../model/products';

import { ProductsState } from './products-state';

@Injectable({ providedIn: 'root' })
export class ProductsStore extends Store<ProductsState> {
	concernedRestaurant: Restaurants;
	productsIds: ProductsIds = {articlesIds : '', menusIds:''};

	constructor(
		private clientsApi: ClientsApiService,
		private restaurantsApi: RestaurantsApiService
	) {
		super(new ProductsState());
	}

	async getProductsByRestaurant(type: BasketObjectsType): Promise<ProductsIds>{
		const restId = localStorage.getItem('restaurantId');
		if(restId){
			const response = await this.restaurantsApi.getRestaurantById(restId).toPromise();
			if(response){
				this.concernedRestaurant = response;
				console.log(this.concernedRestaurant.products.articles);
				if(type === 'menus'){
					this.productsIds.menusIds = this.concernedRestaurant.products.menus.join(',');
					this.productsIds.articlesIds = this.concernedRestaurant.products.articles.join(',');
				} else {
					this.productsIds.articlesIds = this.concernedRestaurant.products.articles.join(',');
				}
			}
		}
		console.log(this.productsIds);
		return this.productsIds;
	}

	addProductsObject(product: ProductsObjects): void {
		if (product.type === BasketObjectsType.article) {
			this.setState({
				// Spread state object
				...this.state,
				// Add to product.type property (articles or menus) the product
				[product.type]: [...this.state[product.type].concat(product.product as Articles)]
			});
		}
	}

	addMenusObject(product: ProductsObjects): void {
		if (product.type === BasketObjectsType.menu) {
			this.setState({
				// Spread state object
				...this.state,
				// Add to product.type property (articles or menus) the product
				[product.type]: [...this.state[product.type].concat(product.product as Menus)]
			});
		}
	}

	deleteArticle(articleId: string){
		this.setState({
			...this.state,
			articles : this.state.articles.filter(article => articleId !== article._id),
		});
		console.log(this.state.articles);
	}

	deleteMenu(menuId: string){
		this.setState({
			...this.state,
			menus : this.state.menus.filter(menu => menuId !== menu._id),
		});
	}
}
