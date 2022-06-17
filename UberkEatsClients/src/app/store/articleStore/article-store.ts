import { Injectable } from '@angular/core';
import { BasketObjects } from 'app/model/basket';
import { Store } from 'rxjs-observable-store'

import { BasketState } from './article-state'

@Injectable({ providedIn: 'root' })
export class BasketStore extends Store<BasketState> {
    constructor() {
        super(new BasketState())
    }

    addBasketObject(product: BasketObjects): void {
        this.setState({
            ...this.state, // Spread state object
            [product.type]: [...this.state[product.type].concat(product)] // Add to product.type property (articles or menus) the product
        })
    }
}