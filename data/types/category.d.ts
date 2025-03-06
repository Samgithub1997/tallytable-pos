// /types/category.d.ts
import { IRestaurant } from './restaurant';

export interface ICategory {
  _id?: string;
  restaurantId: IRestaurant['_id'];
  name: string;
  sortOrder?: number;
}
