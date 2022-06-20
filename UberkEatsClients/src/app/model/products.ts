import { Articles } from './articles';
import { BasketObjectsType } from './basket';
import { Menus } from './menus';

export interface Products {
  menus: Menus[];
  articles: Articles[];
}

export interface ProductsObjects {
  type: BasketObjectsType;
  id: number;
  product: Articles | Menus;
}

