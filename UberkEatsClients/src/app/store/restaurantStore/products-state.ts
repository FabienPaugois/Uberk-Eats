import { Articles } from '../../model/articles';
import { Menus } from '../../model/menus';
import { ProductsObjects } from '../../model/products';

export class ProductsState {
	articles: Articles[] = [];
	menus: Menus[] = [];
}
