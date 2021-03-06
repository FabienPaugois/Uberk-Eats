import { Articles } from './articles';

export interface Menus {
  _id: string;
  name: string;
  price: number;
  description: string;
  articles: string[];
  imageUrl: string;
}
