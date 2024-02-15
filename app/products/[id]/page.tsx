"use client";
import { getProduct } from "@/app/api";
import Product from "@/app/components/Products/Product/Product";
import { product } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useParams();

  const { id } = searchParams;
  const [product, setProduct] = useState<product | null>(null);
  const fetchProduct = async () => {
    try {
      const response = await getProduct(typeof id === "string" ? id : ""); // Replace with your API endpoint
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return <main>{product && <Product product={product} />}</main>;
}
