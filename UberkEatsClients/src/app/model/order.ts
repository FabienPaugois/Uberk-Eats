import { BasketObjects } from './basket';

export interface Orders {
  id: number;
  menus: OrderProducts[];
  articles: OrderProducts[];
  clientId: number;
  deliveryAddress: string;
  restaurantId: number;
  status: number;
  timestamp: CustomTimeStamp;
}

export interface CustomTimeStamp {
  createdAt: Date;
  pickepUpAt: Date;
  deliveredAt: Date;
  readyAt: Date;
}

export interface OrderProducts {
  id: number;
  qty: number;
}
