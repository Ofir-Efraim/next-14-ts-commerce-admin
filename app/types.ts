export type product = {
  name: string;
  description: string;
  price: number;
  picture: string | File;
  id: string;
  active: boolean;
  nutritionalValues: nutritionalValues;
  quantity: number;
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
export type couponCode = {
  coupon_code: string;
  discount_percentage: number;
  id: string;
  active: boolean;
};
export type orderItem = Omit<product, "nutritionalValues" | "description"> & {
  quantity: number;
  order_id: string;
};

export type order = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  pickupSpot?: string;
  address?: string;
  products: orderItem[];
  status: string;
  bagged: boolean;
  paid: boolean;
  date: string;
};
export type client = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  pickupSpot?: string;
  address?: string;
};
export type Query = {
  [key: string]: string[];
};
