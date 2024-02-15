"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { nutritionalValues, product } from "@/app/types";
import Image from "next/image";
import styles from "./Product.module.css";
import { editProduct } from "@/app/api";

type ProductProps = {
  product: product | null;
};

const Product = ({ product }: ProductProps) => {
  const [editableProduct, setEditableProduct] = useState({ ...product });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };
  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setEditableProduct((prevProduct) => ({
        ...prevProduct,
        picture: selectedFile,
      }));
    }
  };
  const handleNestedInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct!,
      nutritionalValues: {
        ...prevProduct?.nutritionalValues!,
        [id]: value,
      },
    }));
  };

  const handleAddIngredient = () => {
    setEditableProduct((prevProduct) => ({
      ...prevProduct!,
      nutritionalValues: {
        ...prevProduct?.nutritionalValues!,
        ingredients: [
          ...(prevProduct?.nutritionalValues?.ingredients || []),
          "",
        ],
      },
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setEditableProduct((prevProduct) => ({
      ...prevProduct!,
      nutritionalValues: {
        ...prevProduct?.nutritionalValues!,
        ingredients: [
          ...(prevProduct?.nutritionalValues?.ingredients?.slice(0, index) ||
            []),
          ...(prevProduct?.nutritionalValues?.ingredients?.slice(index + 1) ||
            []),
        ],
      },
    }));
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct!,
      nutritionalValues: {
        ...prevProduct?.nutritionalValues!,
        ingredients: (prevProduct?.nutritionalValues?.ingredients || []).map(
          (ingredient, i) => (i === index ? value : ingredient)
        ),
      },
    }));
  };

  const handleSaveChanges = async () => {
    await editProduct(editableProduct as product);
    router.push("/products");
  };

  const handleCancel = () => {
    // Reset the editableProduct to the original product
    setEditableProduct({ ...product });
  };

  const handleNavigateBack = () => {
    router.push("/products");
  };

  return (
    <div className={styles.productContainer}>
      <h2 className={styles.productTitle}>{editableProduct.name}</h2>
      <div>
        <label className={styles.label} htmlFor="description">
          תיאור:
        </label>
        <textarea
          className={styles.textarea}
          id="description"
          value={editableProduct.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="price">
          מחיר:
        </label>
        <input
          className={styles.input}
          type="number"
          id="price"
          value={editableProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="picture">
          תמונה:
        </label>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          id="picture"
          onChange={handlePictureChange}
        />
        {editableProduct.picture && (
          <div className={styles.pictureContainer}>
            {typeof editableProduct.picture === "string" && (
              <Image
                src={editableProduct.picture}
                alt={editableProduct.name ? editableProduct.name : ""}
                width={100}
                height={100}
              />
            )}
          </div>
        )}
      </div>

      {/* Nutritional Values */}
      <div>
        <label className={styles.label} htmlFor="servingSize">
          גודל המנה:
        </label>
        <input
          className={styles.input}
          type="number"
          id="servingSize"
          value={editableProduct.nutritionalValues?.servingSize || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="calories">
          קלוריות:
        </label>
        <input
          className={styles.input}
          type="number"
          id="calories"
          value={editableProduct.nutritionalValues?.calories || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="caloriesFromFat">
          קלוריות משומנים:
        </label>
        <input
          className={styles.input}
          type="number"
          id="caloriesFromFat"
          value={editableProduct.nutritionalValues?.caloriesFromFat || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="carbs">
          פחות:
        </label>
        <input
          className={styles.input}
          type="number"
          id="carbs"
          value={editableProduct.nutritionalValues?.carbs || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="protein">
          חלבון:
        </label>
        <input
          className={styles.input}
          type="number"
          id="protein"
          value={editableProduct.nutritionalValues?.protein || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="fats">
          שומנים:
        </label>
        <input
          className={styles.input}
          type="number"
          id="fats"
          value={editableProduct.nutritionalValues?.fats || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="saturatedFat">
          שומן רווי:
        </label>
        <input
          className={styles.input}
          type="number"
          id="saturatedFat"
          value={editableProduct.nutritionalValues?.saturatedFat || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="transFat">
          טרנס שומן:
        </label>
        <input
          className={styles.input}
          type="number"
          id="transFat"
          value={editableProduct.nutritionalValues?.transFat || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="fiber">
          סיבים תזונתיים:
        </label>
        <input
          className={styles.input}
          type="number"
          id="fiber"
          value={editableProduct.nutritionalValues?.fiber || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="cholesterol">
          כולסטרול:
        </label>
        <input
          className={styles.input}
          type="number"
          id="cholesterol"
          value={editableProduct.nutritionalValues?.cholesterol || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="sodium">
          נתרן:
        </label>
        <input
          className={styles.input}
          type="number"
          id="sodium"
          value={editableProduct.nutritionalValues?.sodium || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="sugars">
          סוכרים:
        </label>
        <input
          className={styles.input}
          type="number"
          id="sugars"
          value={editableProduct.nutritionalValues?.sugars || ""}
          onChange={handleNestedInputChange}
        />
      </div>
      <div>
        <label className={styles.label}>Ingredients:</label>
        {editableProduct.nutritionalValues?.ingredients?.map(
          (ingredient, index) => (
            <div
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
              key={index}
            >
              <input
                className={styles.input}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <button
                style={{ margin: "10px 0" }}
                onClick={() => handleRemoveIngredient(index)}
              >
                הסרה
              </button>
            </div>
          )
        )}
        <button style={{ margin: "10px 0" }} onClick={handleAddIngredient}>
          הוסף רכיב
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSaveChanges}>
          שמור שינויים
        </button>
        <button className={styles.button} onClick={handleCancel}>
          איפוס
        </button>
        <button
          className={styles.button + " " + styles.lastButton}
          onClick={handleNavigateBack}
        >
          חזור למוצרים
        </button>
      </div>
    </div>
  );
};

export default Product;
