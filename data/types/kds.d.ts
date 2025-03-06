export type OrderItem = {
    id: string; // Unique identifier for the order item
    name: string; // Name of the dish
    specialInstructions?: string; // Special instructions or modifications
    station: "Grill" | "Salad" | "Fryer" | "Dessert"; // Kitchen station responsible
    status: "new" | "in-progress" | "done"; // Current status of the item
  };
  
  export type Order = {
    id: string; // Unique identifier for the order
    timestamp: number; // UNIX timestamp for when the order was created
    items: OrderItem[]; // Array of items in the order
    isVIP?: boolean; // Indicates if the order is a VIP order
    isRush?: boolean; // Indicates if the order is a rush order
  };
  
  export type FilterOptions = {
    status?: "new" | "in-progress" | "done"; // Filter by item status
    isVIP?: boolean; // Filter by VIP orders
    isRush?: boolean; // Filter by rush orders
  };
  
  export type Dish = {
    id: string; // Unique identifier for the dish
    name: string; // Name of the dish
    description: string; // Description of the dish
    price: number; // Current price of the dish
    originalPrice?: number; // Original price of the dish, if applicable
    isPopular?: boolean; // Indicates if the dish is popular
    image: string; // URL to the image of the dish
    specialInstructions: string; // Special instructions for the dish
  };
  