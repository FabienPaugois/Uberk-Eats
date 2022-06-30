import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Articles } from '../../..//model/articles';
import { Menus } from '../../../model/menus';
import { Products, ProductsIds } from '../../../model/products';
import { Subject, takeUntil } from 'rxjs';
import { ProductsStore } from '../../../store/restaurantStore/products-store';
import { BasketObjectsType } from '../../../model/basket';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { HttpResponse } from '@angular/common/http';
import { ClientsApiService } from 'app/services/clients-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModifyMenuComponent } from '../modify-menu/modify-menu.component';

@Component({
	selector: 'app-create-menu',
	templateUrl: './create-menu.component.html',
	styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
	@Input() menuInfo: Menus = { _id: '', name: '', description: '', price: 0, imageUrl: '', articles: [] };
	public menuForm: FormGroup; // variable of type FormGroup is created
	productsContent: Products;
	productsIds: ProductsIds;
	ngUnsubscribe = new Subject();
	articles: Articles[];

	constructor(
		public restaurantsApi: RestaurantsApiService,
		private clientsApi: ClientsApiService,
		public router: Router,
		private fb: FormBuilder,
		private store: ProductsStore,
		private dialog: MatDialog
	) {
		// Form element defined below
		this.menuForm = this.fb.group({
			name: '',
			description: '',
			price: '',
			imageUrl: '',
			articles: []
		});
	}

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
				this.productsContent = data;
			});
		let receivedArticles = false; let receivedMenus = false;
		this.productsIds = await this.store.getProductsByRestaurant(BasketObjectsType.menu);
		if (this.productsIds.articlesIds) {
			this.clientsApi.FetchArticleData(this.productsIds.articlesIds).subscribe((articles: Articles[]) => {
				this.productsContent.articles = articles;
				receivedArticles = true;
				if (receivedArticles && receivedMenus) {
					this.hideLoader();
				}
			});
		}
		if (this.productsIds.menusIds) {
			this.clientsApi.FetchMenusData(this.productsIds.menusIds).subscribe((menus: Menus[]) => {
				this.productsContent.menus = menus;
				receivedMenus = true;
				if (receivedArticles && receivedMenus) {
					this.hideLoader();
				}
			});
		}
	}

	addMenu() {
		this.menuInfo.name = this.menuForm.get('name')?.value;
		this.menuInfo.description = this.menuForm.get('description')?.value;
		this.menuInfo.price = this.menuForm.get('price')?.value;
		this.menuInfo.imageUrl = this.menuForm.get('imageUrl')?.value;
		this.menuInfo.articles = this.menuForm.get('articles')?.value;
		const restdata = localStorage.getItem('restaurantId');
		if (restdata) {
			const restaurantId = restdata;
			this.restaurantsApi.createMenu(this.menuInfo).subscribe((response: HttpResponse<Menus>) => {
				const menuId = response.body?._id;
				if (response.status === 200 && menuId) {
					this.restaurantsApi.addMenuToRestaurant(menuId, restaurantId).subscribe((response2: HttpResponse<Menus>) => {
						if (response2.status === 200 && response.body) {
							const articleData: Articles = response.body;
							this.store.addMenusObject({
								type: BasketObjectsType.menu,
								id: this.store.state.articles.length + 1,
								product: { ...articleData }
							});
						}
					});
				}
			});
		}
	}

	showModifyMenuPopUp(menu: Menus) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.width = '50%'
		dialogConfig.height = '50%'
		dialogConfig.data = {
			...menu,
			articles: this.productsContent.articles.filter(article => menu.articles.includes(article.name))
		}
		this.dialog.open(ModifyMenuComponent, dialogConfig)
	}

	deleteMenu(menuId: string) {
		const restdata = localStorage.getItem('restaurantId');
		if (restdata) {
			const restaurantId = restdata;
			this.restaurantsApi.removeMenuFromRestaurant(menuId, restaurantId).subscribe((response2: HttpResponse<Menus>) => {
				if (response2.status === 200) {
					this.store.deleteMenu(menuId);
				}
			});
		}
	}

	hideLoader() {
		const loader = document.getElementById('loader');
		if (loader !== null) {
			loader.hidden = true;
		}
	}
}
