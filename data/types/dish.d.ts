// /types/dish.d.ts
import { IRestaurant } from './restaurant';
import { ICategory } from './category';

export interface IDish {
  _id?: string;
  restaurantId: IRestaurant['_id'];
  categoryId: ICategory['_id'];
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  image?: string;
}
