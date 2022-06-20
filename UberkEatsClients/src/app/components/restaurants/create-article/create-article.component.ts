import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Roles } from '../../../model/roles';
import { Articles } from '../../..//model/articles';
import { RestaurantsApiService } from '../../../services/restaurants-api.service';
import { ProductsStore } from '../../../store/restaurantStore/products-store';
import { Products } from '../../../model/products';
import { BasketObjectsType } from '../../../model/basket';

@Component({
	selector: 'app-create-article',
	templateUrl: './create-article.component.html',
	styleUrls: ['./create-article.component.scss']
})

export class CreateArticleComponent implements OnInit {
  @Input() articleInfo: Articles = { id: NaN, name:'', description: '', price: 0, imageUrl:''};
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);
  productsContent: Products;
  ngUnsubscribe = new Subject();

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(
    public restaurantsApi: RestaurantsApiService,
    public router: Router,
    private fb: FormBuilder,
    private store: ProductsStore
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

  ngOnInit(): void {
    // subscription to the store
    this.store.state$
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.productsContent = data;
      });
  }

  addArticle() {
    this.articleInfo.id = this.store.state.articles.length + 1;
  	this.articleInfo.name = this.registerForm.get('name')?.value;
  	this.articleInfo.description = this.registerForm.get('description')?.value;
  	this.articleInfo.price = this.registerForm.get('price')?.value;
  	this.articleInfo.imageUrl = this.registerForm.get('imageUrl')?.value;
    this.store.addProductsObject({
      type: BasketObjectsType.article,
      id: this.store.state.articles.length + 1,
      product: this.articleInfo
    });
    console.log(this.productsContent);
  }

}
