// /types/restaurant.d.ts

export interface IRestaurant {
    _id?: string;               // Mongo _id can be optional in TS definitions
    name: string;
    location?: {
      address?: string;
      coordinates?: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
    };
    phone?: string;
    openingHours?: {
      // Example structure; you can expand for each day of the week
      [day: string]: {
        open: string;
        close: string;
      };
    };
  }
  