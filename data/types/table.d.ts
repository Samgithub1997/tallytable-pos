// /types/table.d.ts
import { IRestaurant } from './restaurant';

export interface ITable {
  _id?: string;
  restaurantId: IRestaurant['_id']; // or string if you want to store just the ObjectId
  name: string;
  capacity: number;
  location?: string;               // e.g. "Ground Floor", "Rooftop"
  status?: 'Available' | 'Occupied' | 'Reserved';  // If you store current status
  nextReservationDate?: Date;
  nextReservationTime?: string;
}
