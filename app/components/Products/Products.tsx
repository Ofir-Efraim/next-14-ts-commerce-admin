"use client";
import { newProduct, product } from "@/app/types";
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
import { addProduct, deleteProduct, toggleActive } from "@/app/api";
type ProductsProps = {
  products: product[];
  fetchProducts: () => Promise<void>;
};
export default function Products({ products, fetchProducts }: ProductsProps) {
  const router = useRouter();
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const handleToggleActive = async (productId: string) => {
    await toggleActive(productId);
    fetchProducts();
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  const handleEdit = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  const handleAddProduct = async (newProduct: newProduct) => {
    await addProduct(newProduct);
    setIsProductFormOpen(false);
    fetchProducts();
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
