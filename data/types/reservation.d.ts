// /types/reservation.d.ts
import { IRestaurant } from './restaurant';
import { ITable } from './table';
import { IUser } from './user'; // remove if you don't have a user system

export interface IReservation {
  _id?: string;
  restaurantId: IRestaurant['_id'];
  tableId: ITable['_id'];
  
  // If you tie to a user system:
  userId?: IUser['_id'];
  
  reservedFor?: {
    name: string;
    phone: string;
    email: string;
  };
  
  reservationDate: string;  // "MM/DD/YYYY" or your preferred format
  reservationTime: string;  // "HH:mm" in 24-hour format, e.g. "14:30"
  waitTime?: number;         // in hours

  status?: 'Booked' | 'Seated' | 'Cancelled' | 'Completed';

  // If you want an actual Date object for quick queries:
  reservationDateTime?: Date; 

  specialRequests?: string;
  createdAt?: Date;
}
