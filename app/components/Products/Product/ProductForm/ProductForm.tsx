import React, { useState } from "react";
import { newProduct, nutritionalValues, product } from "@/app/types";
import styles from "./ProductForm.module.css";
import Image from "next/image";
type ProductFormProps = {
  onClose: () => void;
  onSubmit: (newProduct: newProduct) => void;
};

const ProductForm = ({ onClose, onSubmit }: ProductFormProps) => {
  const initialNutritionalValues: nutritionalValues = {
    ingredients: [""],
    servingSize: 0,
    calories: 0,
    caloriesFromFat: 0,
    carbs: 0,
    protein: 0,
    fats: 0,
    saturatedFat: 0,
    transFat: 0,
    fiber: 0,
    cholesterol: 0,
    sodium: 0,
    sugars: 0,
  };

  const initialProduct: newProduct = {
    name: "",
    description: "",
    price: 0,
    picture: "",
    active: true,
    nutritionalValues: initialNutritionalValues,
  };

  const [newProduct, setNewProduct] = useState<newProduct>(initialProduct);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };
  
  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        picture: selectedFile,
      }));
    }
  };
  const addIngredient = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      nutritionalValues: {
        ...prevProduct.nutritionalValues,
        ingredients: [...prevProduct.nutritionalValues.ingredients, ""],
      },
    }));
  };
  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...newProduct.nutritionalValues.ingredients];
    newIngredients[index] = e.target.value;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      nutritionalValues: {
        ...prevProduct.nutritionalValues,
        ingredients: newIngredients,
      },
    }));
  };
  const handleNutritionalInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      nutritionalValues: {
        ...prevProduct.nutritionalValues,
        [id]: Number(value),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newProduct);
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="name">
            שם המוצר:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="description">
            תיאור המוצר:
          </label>
          <textarea
            className={styles.textArea}
            id="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="price">
            מחיר:
          </label>
          <input
            className={styles.input}
            type="number"
            id="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="picture">
            תמונה:
          </label>
          <input
            type="file"
            accept="image/*"
            id="picture"
            onChange={handlePictureChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="servingSize">
            גודל המנה (גרם):
          </label>
          <input
            className={styles.input}
            type="number"
            id="servingSize"
            value={newProduct.nutritionalValues.servingSize}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="calories">
            קלוריות:
          </label>
          <input
            className={styles.input}
            type="number"
            id="calories"
            value={newProduct.nutritionalValues.calories}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="caloriesFromFat">
            קלוריות משומנים:
          </label>
          <input
            className={styles.input}
            type="number"
            id="caloriesFromFat"
            value={newProduct.nutritionalValues.caloriesFromFat}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="carbs">
            פחמימות:
          </label>
          <input
            className={styles.input}
            type="number"
            id="carbs"
            value={newProduct.nutritionalValues.carbs}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="protein">
            חלבון:
          </label>
          <input
            className={styles.input}
            type="number"
            id="protein"
            value={newProduct.nutritionalValues.protein}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="fats">
            שומנים:
          </label>
          <input
            className={styles.input}
            type="number"
            id="fats"
            value={newProduct.nutritionalValues.fats}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="saturatedFat">
            שומן רווי:
          </label>
          <input
            className={styles.input}
            type="number"
            id="saturatedFat"
            value={newProduct.nutritionalValues.saturatedFat}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="transFat">
            שומן טרנס:
          </label>
          <input
            className={styles.input}
            type="number"
            id="transFat"
            value={newProduct.nutritionalValues.transFat}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="fiber">
            סיבים:
          </label>
          <input
            className={styles.input}
            type="number"
            id="fiber"
            value={newProduct.nutritionalValues.fiber}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="cholesterol">
            כולסטרול:
          </label>
          <input
            className={styles.input}
            type="number"
            id="cholesterol"
            value={newProduct.nutritionalValues.cholesterol}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="sodium">
            נתרן:
          </label>
          <input
            className={styles.input}
            type="number"
            id="sodium"
            value={newProduct.nutritionalValues.sodium}
            onChange={handleNutritionalInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="sugars">
            סוכרים:
          </label>
          <input
            className={styles.input}
            type="number"
            id="sugars"
            value={newProduct.nutritionalValues.sugars}
            onChange={handleNutritionalInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>רכיבים:</label>
          {newProduct.nutritionalValues.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          ))}
          <button type="button" onClick={addIngredient}>
            הוסף רכיב
          </button>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} type="submit">
            שמור
          </button>
          <button className={styles.button} type="button" onClick={onClose}>
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
