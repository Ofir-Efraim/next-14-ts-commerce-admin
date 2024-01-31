"use client";
import Product from "@/app/components/Products/Product/Product";
import { product } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useParams();

  const { id } = searchParams;
  const [product, setProduct] = useState<product | null>(null);
  //   useEffect(() => {
  //     // Fetch the product by id from your API when the component mounts
  //     // Replace this with your actual API call
  //     const fetchProduct = async () => {
  //       try {
  //         const response = await fetch(`/api/products/${id}`); // Replace with your API endpoint
  //         const data = await response.json();
  //         setProduct(data);
  //       } catch (error) {
  //         console.error("Error fetching product:", error);
  //       }
  //     };

  //     if (id) {
  //       fetchProduct();
  //     }
  //   }, [id]);

  return (
    <main>
      <Product
        product={{
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
        }}
      />
    </main>
  );
}
