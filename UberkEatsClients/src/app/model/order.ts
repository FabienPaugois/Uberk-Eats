export interface OrdersObject {
  orders: Order[];
}

export interface Order {
  id: string;
  menus: OrderProducts[];
  articles: OrderProducts[];
  clientId: string;
  deliveryAddress: string;
  restaurantId: string;
  deliverymanId: string;
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
  id: string;
  qty: number;
}
