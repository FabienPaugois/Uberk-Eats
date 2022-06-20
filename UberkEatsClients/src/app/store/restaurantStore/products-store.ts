import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { Articles } from '../../model/articles';
import { BasketObjectsType } from '../../model/basket';
import { ProductsObjects } from '../../model/products';

import { ProductsState } from './products-state';

@Injectable({ providedIn: 'root' })
export class ProductsStore extends Store<ProductsState> {
	constructor() {
    super(new ProductsState());
	}

  addProductsObject(product: ProductsObjects): void {
    if (product.type === BasketObjectsType.article) {
    this.setState({
      ...this.state, // Spread state object
      [product.type]: [...this.state[product.type].concat(product.product as Articles)] // Add to product.type property (articles or menus) the product
    });
    }
	}
}
