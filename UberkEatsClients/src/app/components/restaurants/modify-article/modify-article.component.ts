import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articles } from 'app/model/articles';
import { BasketObjectsType } from 'app/model/basket';
import { RestaurantsApiService } from 'app/services/restaurants-api.service';
import { ProductsStore } from 'app/store/restaurantStore/products-store';

@Component({
	selector: 'app-modify-article',
	templateUrl: './modify-article.component.html',
	styleUrls: ['./modify-article.component.scss']
})
export class ModifyArticleComponent implements OnInit {

	public modifyArticleForm: FormGroup; // variable of type FormGroup is created
	public loader = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public modalData: Articles,
		private fb: FormBuilder,
		private restoApiService: RestaurantsApiService,
		private store: ProductsStore,
	) {
		this.modifyArticleForm = this.fb.group({
			_id: new FormControl({ value: modalData._id, disabled: true }),
			name: modalData.name,
			description: modalData.description,
			price: modalData.price,
			imageUrl: modalData.imageUrl
		});
	}

	get form() { return this.modifyArticleForm.controls; }

	ngOnInit(): void {
		console.log(this.modalData)
	}

	modifyArticle() {
		const restdata = localStorage.getItem('restaurantId');
		if (restdata) {
			if (this.modifyArticleForm.invalid) { return; } // Return if form is invalid
			this.loader = true
			this.restoApiService.editArticle({
				_id: this.form._id.value,
				name: this.form.name.value,
				description: this.form.description.value,
				price: this.form.price.value,
				imageUrl: this.form.imageUrl.value,
			}).subscribe((response: HttpResponse<any>) => {
				const articleId = response.body?.article?._id;
				if (response.status === 200 && articleId) {
					this.store.editProduct({type: BasketObjectsType.article, product: response.body?.article, id: 0})
					this.loader = false
				}
			})
		}
	}

}
