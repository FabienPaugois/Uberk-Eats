import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../../model/roles';
import { Articles } from '../../..//model/articles';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Menus } from '../../../model/menus';
import { Products } from '../../../model/products';
import { Subject, takeUntil } from 'rxjs';
import { ProductsStore } from '../../../store/restaurantStore/products-store';
import { BasketObjectsType } from '../../../model/basket';

@Component({
	selector: 'app-create-menu',
	templateUrl: './create-menu.component.html',
	styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  @Input() menuInfo: Menus = {id: NaN, name:'', description:'', price:0, imageUrl: '', articles: []};
  public menuForm: FormGroup; // variable of type FormGroup is created

  articles: Articles[] = [
  	{
  		id: 1,
  		name: 'Whooper',
  		description: 'Lorem ipsum',
  		price: 4,
  		imageUrl: '',
  	},
  	{
  		id: 2,
  		name: 'Triple Cheese',
  		description: 'Lorem ipsum',
  		price: 5,
  		imageUrl: '',
  	},
  	{
  		id: 3,
  		name: 'Double Steakhouse',
  		description: 'Lorem ipsum',
  		price: 4,
  		imageUrl: '',
  	},
  	{
  		id: 4,
  		name: 'Chicken Alabama',
  		description: 'Lorem ipsum',
  		price: 6,
  		imageUrl: '',
  	},
  	{
  		id: 5,
  		name: 'Double Cheese Bacon Vegan',
  		description: 'Lorem ipsum',
  		price: 10,
  		imageUrl: '',
  	},
  	{
  		id: 6,
  		name: 'Potatoes',
  		description: 'Lorem ipsum',
  		price: 2,
  		imageUrl: '',
  	},
  	{
  		id: 7,
  		name: 'Fries',
  		description: 'Lorem ipsum',
  		price: 2,
  		imageUrl: '',
  	},
  	{
  		id: 8,
  		name: 'Coke',
  		description: 'Lorem ipsum',
  		price: 2.5,
  		imageUrl: '',
  	},
  	{
  		id: 9,
  		name: 'Pepsi',
  		description: 'Lorem ipsum',
  		price: 2.5,
  		imageUrl: '',
  	},
  ];
  productsContent: Products;
  ngUnsubscribe = new Subject();

  constructor(
    public clientsApi: ClientsApiService,
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
  	this.store.addMenusObject({
  		type: BasketObjectsType.menu,
  		id: this.store.state.articles.length + 1,
  		product: { ...this.menuInfo }
  	});
  	console.log(this.productsContent);
  }

}
