export interface Restaurants {
  _id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  ownerId: string;
  types: string[];
  products: ProductsIds;
  imageUrl: string;
}

export interface ProductsIds {
  articles: string[];
  menus: string[];
}
