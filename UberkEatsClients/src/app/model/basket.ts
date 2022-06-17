export interface Basket {
  menus: BasketObjects[];
  articles: BasketObjects[];
}

export interface BasketObjects {
  type: BasketObjestType;
  id: number;
  qty: number;
}

export enum BasketObjestType {
  article = 'articles',
  menu = 'menus'
}
