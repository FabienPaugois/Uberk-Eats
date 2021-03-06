import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Articles } from '../../../model/articles';
import { Basket, BasketObjects, BasketObjectsType } from '../../../model/basket';
import { Menus } from '../../../model/menus';
import { ClientsApiService } from '../../../services/clients-api.service';
import { BasketStore } from '../../../store/articleStore/basket-store';
import { Location } from '@angular/common';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  @Input() registerInfo: Basket = {
  	menus: [{ id: '', qty: Number.NaN, type: BasketObjectsType.menu }],
  	articles: [{ id: '', qty: Number.NaN, type: BasketObjectsType.article }]
  };
  count = 1;
  articleId: string;
  menuId: string;
  article: Articles;
  menu: Menus;
  basketContent: Basket;
  basketEntry: BasketObjects | undefined;
  routeSub: Subscription;
  articleSub: Subscription;
  menuSub: Subscription;
  basket: unknown;

  ngUnsubscribe = new Subject();


  constructor(
    public clientsApi: ClientsApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public store: BasketStore,
    private location: Location
  ) {}

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
  			this.basketContent = data;
  		});

  	this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
  		if (params.articles != null) {
  			this.menu = {
  				_id: params._id,
  				description: params.description,
  				name: params.name,
  				price: params.price,
  				articles: params.articles,
  				imageUrl: params.imageUrl
  			};
  		}
  		else {
  			this.article = {
  				_id: params._id,
  				description: params.description,
  				name: params.name,
  				price: params.price,
  				imageUrl: params.imageUrl
  			};
  		}
  	});
  }

  relocate() {
  	this.location.back();
  }

  updateCount(increment: boolean): void {
  	if (this.count === 1 && increment) {
  		this.count++;
  	} else if (this.count !== 1) {
  		increment ? this.count++ : this.count--;
  	}
  }

  addToBasket() {
  	if (this.store.state[this.article ? BasketObjectsType.article : BasketObjectsType.menu].find(
  		entry => entry.id === (this.article ? this.article._id : this.menu._id)
  	)) {
  		this.store.editbasketQty({
  			id: this.article ? this.article._id : this.menu._id,
  			qty: this.count,
  			type: this.article ? BasketObjectsType.article : BasketObjectsType.menu
  		});
  	} else {
  		this.store.addBasketObject({
  			id: this.article ? this.article._id : this.menu._id,
  			qty: this.count,
  			type: this.article ? BasketObjectsType.article : BasketObjectsType.menu
  		});
  	}
  	this.location.back();
  }
}
