export type product = {
  name: string;
  description: string;
  price: number;
  picture: string | File;
  id: string;
  active: boolean;
  nutritionalValues: nutritionalValues;
};
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
