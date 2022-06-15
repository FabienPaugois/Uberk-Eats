export interface Basket {
  menus: BasketObjects[]
  articles: BasketObjects[];
}

export interface BasketObjects {
  id: number,
  qty: number
}
