export interface Basket {
  menus: BasketObjects[];
  articles: BasketObjects[];
}

export interface BasketObjects {
  type: BasketObjectsType;
  id: string;
  qty: number;
}

export enum BasketObjectsType {
  article = 'articles',
  menu = 'menus'
}
