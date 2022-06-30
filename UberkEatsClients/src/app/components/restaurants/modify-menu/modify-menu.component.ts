import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articles } from 'app/model/articles';
import { BasketObjectsType } from 'app/model/basket';
import { Menus } from 'app/model/menus';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { ProductsState } from 'app/store/restaurantStore/products-state';
import { ProductsStore } from 'app/store/restaurantStore/products-store';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-modify-menu',
	templateUrl: './modify-menu.component.html',
	styleUrls: ['./modify-menu.component.scss']
})
export class ModifyMenuComponent implements OnInit {

	ngUnsubscribe = new Subject();
	public menuForm: FormGroup; // variable of type FormGroup is created
	productsContent: ProductsState;
	loader = false;

	constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private restoApiService: RestaurantsApiService,
    private store: ProductsStore,
    public fb: FormBuilder
	) {
		console.log(modalData.articles);
		this.menuForm = this.fb.group({
			_id: new FormControl({ value: modalData._id, disabled: true }),
			name: modalData.name,
			description: modalData.description,
			price: modalData.price,
			imageUrl: modalData.imageUrl,
			articles: modalData.articles
		});
	}

	get form() { return this.menuForm.controls; }

	ngOnInit(): void {
		this.store.state$
  		.pipe(
  			takeUntil(this.ngUnsubscribe))
  		.subscribe(data => {
  			this.productsContent = data;
  		});
	}

	modifyMenu() {
		const restdata = localStorage.getItem('restaurantId');
		if (restdata) {
			if (this.menuForm.invalid) { return; } // Return if form is invalid
			this.loader = true;
			this.restoApiService.editMenu({
				_id: this.form._id.value,
				name: this.form.name.value,
				description: this.form.description.value,
				price: this.form.price.value,
				imageUrl: this.form.imageUrl.value,
				articles: this.form.articles.value,
			}).subscribe((response: HttpResponse<any>) => {
				const articleId = response.body?.article?._id;
				if (response.status === 200 && articleId) {
					this.store.editMenu({type: BasketObjectsType.article, product: response.body?.article, id: 0});
					this.loader = false;
				}
			});
		}
	}
}
