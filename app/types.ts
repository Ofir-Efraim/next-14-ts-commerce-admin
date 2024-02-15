export type product = {
  name: string;
  description: string;
  price: number;
  picture: string | File;
  id: string;
  active: boolean;
  nutritionalValues: nutritionalValues;
};
export type newProduct = Omit<product, "id">;
export type nutritionalValues = {
  ingredients: string[];
  servingSize: number;
  calories: number;
  caloriesFromFat: number;
  carbs: number;
  protein: number;
  fats: number;
  saturatedFat: number;
  transFat: number;
  fiber: number;
  cholesterol: number;
  sodium: number;
  sugars: number;
};
export type location = {
  name: string;
  id: string;
};
export type orderItem = Omit<
  product,
  "nutritionalValues" | "description" | "picture"
> & {
  quantity: number;
  order_id: string;
};

export type order = {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  pickupSpot?: string;
  deliveryAddress?: string;
  products: orderItem[];
};
