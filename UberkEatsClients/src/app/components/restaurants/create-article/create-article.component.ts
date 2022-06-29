import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Roles } from '../../../model/roles';
import { Articles } from '../../..//model/articles';
import { RestaurantsApiService } from '../../../services/restaurants-api.service';
import { ProductsStore } from '../../../store/restaurantStore/products-store';
import { Products, ProductsIds } from '../../../model/products';
import { BasketObjectsType } from '../../../model/basket';
import { HttpResponse } from '@angular/common/http';
import { ClientsApiService } from 'app/services/clients-api.service';
import { Menus } from 'app/model/menus';

@Component({
	selector: 'app-create-article',
	templateUrl: './create-article.component.html',
	styleUrls: ['./create-article.component.scss']
})

export class CreateArticleComponent implements OnInit {
  @Input() articleInfo: Articles = { _id: '', name:'', description: '', price: 0, imageUrl:''};
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);
  productsContent: Products;
  productsIds: ProductsIds;
  ngUnsubscribe = new Subject();

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(
    public restaurantsApi: RestaurantsApiService,
	private clientsApi: ClientsApiService,
    public router: Router,
    private fb: FormBuilder,
    private store: ProductsStore,
  ) {
  	// Form element defined below
  	this.registerForm = this.fb.group({
  		name: '',
  		description: '',
  		price: '',
  		imageUrl: '',
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
  	this.productsIds = await this.store.getProductsByRestaurant(BasketObjectsType.article);
  	if(this.productsIds.articlesIds){
  		this.clientsApi.FetchArticleData(this.productsIds.articlesIds).subscribe((articles: Articles[]) => {
  			this.productsContent.articles = articles;
  		});
  	}
  }

  addArticle() {
  	this.articleInfo.name = this.registerForm.get('name')?.value;
  	this.articleInfo.description = this.registerForm.get('description')?.value;
  	this.articleInfo.price = this.registerForm.get('price')?.value;
  	this.articleInfo.imageUrl = this.registerForm.get('imageUrl')?.value;
	const restdata = localStorage.getItem('restaurantId');
  	if(restdata){
  		const restaurantId = restdata;
		this.restaurantsApi.createArticle(this.articleInfo).subscribe((response: HttpResponse<Articles>) => {
			const articleId = response.body?._id;
			if(response.status === 200 && articleId){
				this.restaurantsApi.addArticleToRestaurant(articleId, restaurantId).subscribe((response2: HttpResponse<Articles>) => {
					if(response2.status === 200){
						this.store.addProductsObject({
							type: BasketObjectsType.article,
							id: this.store.state.articles.length + 1,
							product: { ...this.articleInfo }
						});
					}
				});
			}
		});}
	}

  deleteArticle(articleId: string){
	const restdata = localStorage.getItem('restaurantId');
	if(restdata){
		const restaurantId = restdata;
		this.restaurantsApi.removeArticleFromRestaurant(articleId, restaurantId).subscribe((response2: HttpResponse<Articles>) => {
			if(response2.status === 200){
				this.store.deleteMenu(articleId);
			}
		});
	}
  }
}
