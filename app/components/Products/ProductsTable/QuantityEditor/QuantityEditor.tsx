import { editProduct } from "@/app/api";
import { product } from "@/app/types";
import React, { useState } from "react";
import styles from "./QuantityEditor.module.css";

interface QuantityEditorProps {
  product: product;
}

const QuantityEditor: React.FC<QuantityEditorProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(Number(product.quantity));
  const [originalQuantity, setOriginalQuantity] = useState(
    Number(product.quantity)
  );

  const updateQuantity = async (newQuantity: number) => {
    setQuantity(newQuantity);
    setOriginalQuantity(newQuantity);
    try {
      await editProduct({ ...product, quantity: newQuantity } as product);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleIncrement = () => {
    updateQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(quantity - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleSave = async () => {
    try {
      setOriginalQuantity(quantity);
      await editProduct({ ...product, quantity } as product);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleCancel = () => {
    setQuantity(originalQuantity);
  };

  const isChanged = quantity !== originalQuantity;

  return (
    <div className={styles.quantityEditor}>
      <div className={styles.quantityInputContainer}>
        <button className={styles.quantityInput} onClick={handleDecrement}>
          -
        </button>
        <input
          className={styles.quantityInput}
          type="number"
          value={quantity}
          onChange={handleChange}
        />
        <button className={styles.quantityInput} onClick={handleIncrement}>
          +
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!isChanged}
        >
          שמור
        </button>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={!isChanged}
        >
          בטל
        </button>
      </div>
    </div>
  );
};

export default QuantityEditor;
