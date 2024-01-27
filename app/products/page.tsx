import Products from "../components/Products/Products";

const products = [
  {
    name: "לחם קינואה עדשים",
    description: "לחם קינואה עדשים בריאות מצמחים, ללא גלוטן ללא חומריםן משמרים",
    price: 20,
    picture:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    id: "1",
    active: true,
    nutritionalValues: {
      ingredients: ["קינואה", "מלח", "פלפל"],
      servingSize: 100,
      calories: 200,
      caloriesFromFat: 70,
      carbs: 20,
      protein: 12,
      fats: 8,
      saturatedFat: 0,
      transFat: 0,
      fiber: 2,
      cholesterol: 0,
      sodium: 200,
      sugars: 18,
    },
  },

  {
    name: "לחם קינואה עדשים",
    description:
      "לחם קינואה עדשים  בריאות מצמחים בריאות מצמחיםבריאות מצמחים, ללא גלוטן ללא חומריםן משמרים",
    price: 20,
    picture:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    id: "2",
    active: true,
    nutritionalValues: {
      ingredients: ["כוסמת", "מלח", "פלפל"],
      servingSize: 100,
      calories: 150,
      caloriesFromFat: 50,
      carbs: 10,
      protein: 6,
      fats: 4,
      saturatedFat: 1,
      transFat: 1,
      fiber: 3,
      cholesterol: 100,
      sodium: 200,
      sugars: 16,
    },
  },
];
export default function Home() {
  return (
    <main>
      <Products products={products} />
    </main>
  );
}
