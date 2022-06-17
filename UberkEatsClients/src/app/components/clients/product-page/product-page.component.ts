import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../../../model/articles';
import { Basket, BasketObjects } from '../../../model/basket';
import { Menus } from '../../../model/menus';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  @Input() registerInfo: Basket = {
  	menus: [{ id: Number.NaN, qty: Number.NaN }],
  	articles: [{ id: Number.NaN, qty: Number.NaN}]
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

  constructor(public clientsApi: ClientsApiService, public router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
  	this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
  		if (params.articles != null) {
  			this.menu = {
  				id: parseInt(params.id, 10),
  				description: params.description,
  				name: params.name,
  				price: params.price,
  				articles: params.articles
  			};
  		}
  		else {
  			this.article = {
  				id: parseInt(params.id, 10),
  				description: params.description,
  				name: params.name,
          price: params.price,
          imageUrl: params.imageUrl
  			};
  		}
  	});
  }

  updateCount(increment: boolean): void {
  	if (this.count === 1 && increment) {
  		this.count++;
  	} else if (this.count !== 1) {
  		increment ? this.count++ : this.count--;
  	}
  }

  addToBasket() {
  	const basketJson = localStorage.getItem('basket');
  	this.basketContent = basketJson !== null ? JSON.parse(basketJson) : null;

  	if (this.menu) {
  		this.basketEntry = this.basketContent.menus.find(menu => menu.id === this.menu.id);
  		if (this.basketEntry) { //L'objet existe donc il faut incr�menter
  			this.basketEntry.qty += this.count;
  		}
  		else { //L'objet n'existe pas dans le panier
  			this.basketEntry = { id: this.menu.id, qty: this.count };
  			this.basketContent.menus.push(this.basketEntry);
  		}
  	}
  	else if (this.article){
  		this.basketEntry = this.basketContent.articles.find(article => article.id === this.article.id);
  		if (this.basketEntry) {
  			this.basketEntry.qty += this.count;
  		}
  		else {
  			this.basketEntry = { id: this.article.id, qty: this.count };
  			this.basketContent.articles.push(this.basketEntry);
  		}
  	}
  	localStorage.setItem('basket', JSON.stringify(this.basketContent));
  }
}
