import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Articles } from '../../..//model/articles';
import { Menus } from '../../../model/menus';
import { Products } from '../../../model/products';
import { Subject, takeUntil } from 'rxjs';
import { ProductsStore } from '../../../store/restaurantStore/products-store';
import { BasketObjectsType } from '../../../model/basket';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-create-menu',
	templateUrl: './create-menu.component.html',
	styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  @Input() menuInfo: Menus = {_id: '', name:'', description:'', price:0, imageUrl: '', articles: []};
  public menuForm: FormGroup; // variable of type FormGroup is created

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
  productsContent: Products;
  ngUnsubscribe = new Subject();

  constructor(
    public restaurantsApi: RestaurantsApiService,
    public router: Router,
    private fb: FormBuilder,
    private store: ProductsStore
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

  ngOnInit(): void {
  	// subscription to the store
  	this.store.state$
  		.pipe(
  			takeUntil(this.ngUnsubscribe))
  		.subscribe(data => {
  			this.productsContent = data;
  		});
  }

  addMenu() {
  	this.menuInfo.name = this.menuForm.get('name')?.value;
  	this.menuInfo.description = this.menuForm.get('description')?.value;
  	this.menuInfo.price = this.menuForm.get('price')?.value;
  	this.menuInfo.imageUrl = this.menuForm.get('imageUrl')?.value;
  	this.menuInfo.articles = this.menuForm.get('articles')?.value;
  	this.restaurantsApi.createMenu(this.menuInfo).subscribe((response: HttpResponse<Menus>) => {
  		if(response.status === 200){
  			this.store.addMenusObject({
  				type: BasketObjectsType.menu,
  				id: this.store.state.articles.length + 1,
  				product: { ...this.menuInfo }
  			});
  		}
  	});
  }
}
