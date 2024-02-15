"use client";
import { useEffect, useState } from "react";
import Products from "../components/Products/Products";
import { getProducts } from "../api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <main>
      <Products products={products} fetchProducts={fetchProducts} />
    </main>
  );
}
