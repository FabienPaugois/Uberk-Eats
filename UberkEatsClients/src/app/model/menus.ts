import { Articles } from './articles';

export interface Menus {
  id: string;
  name: string;
  price: string;
  description: string;
  articles: number[];
}
