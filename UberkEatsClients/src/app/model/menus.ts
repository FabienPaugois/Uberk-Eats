import { Articles } from './articles';

export interface Menus {
  id: number;
  name: string;
  price: number;
  description: string;
  articles: number[];
  imageUrl: string;
}
