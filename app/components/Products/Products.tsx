import { product } from "@/app/types";
import styles from "./Products.module.css";
import React from "react";
import Product from "./Product/Product";
type ProductsProps = {
  products: product[];
};
export default function Products({ products }: ProductsProps) {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
