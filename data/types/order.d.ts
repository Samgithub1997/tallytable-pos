// /types/order.d.ts
import { IRestaurant } from './restaurant';
import { ITable } from './table';
import { IReservation } from './reservation';
import { IDish } from './dish';

export interface IOrderItem {
  dishId: IDish['_id'];
  quantity: number;
  specialInstructions?: string;
}

export interface IOrder {
  _id?: string;
  restaurantId: IRestaurant['_id'];
  tableId?: ITable['_id'];
  reservationId?: IReservation['_id'];  // link to a reservation if it exists

  orderItems: IOrderItem[];

  status?: 'Pending' | 'Preparing' | 'Served' | 'Completed' | 'Cancelled';
  totalPrice?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
