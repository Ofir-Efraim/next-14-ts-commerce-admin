"use client";
import { product } from "@/app/types";
import styles from "./Products.module.css";
import React, { useState } from "react";
import Product from "./Product/Product";
import { useRouter } from "next/navigation";
import ProductsTable from "./ProductsTable/ProductsTable";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./Product/ProductForm/ProductForm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
type ProductsProps = {
  products: product[];
};
export default function Products({ products }: ProductsProps) {
  const router = useRouter();
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const handleToggleActive = (productId: string) => {
    console.log(productId);
  };

  const handleDelete = (productId: string) => {
    console.log(productId);
  };

  const handleEdit = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  const handleAddProduct = (newProduct: product) => {
    // Implement the logic to add a new product
    // Update the products state accordingly
    setIsProductFormOpen(false);
  };
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>רשימת מוצרים</h1>
      <ProductsTable
        products={products}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <div className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          onClick={() => setIsProductFormOpen(true)}
        >
          <AddIcon />
        </button>
      </div>

      <Dialog
        open={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
      >
        <DialogTitle textAlign="right">הוסף מוצר חדש</DialogTitle>
        <DialogContent>
          <ProductForm
            onClose={() => setIsProductFormOpen(false)}
            onSubmit={handleAddProduct}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
