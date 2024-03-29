import axios from "axios";
import { newProduct, nutritionalValues, product } from "./types";

const server = process.env.SERVER_ENDPOINT;
export const getProducts = async () => {
  return axios.get(server + "/get_products");
};

export const addProduct = async (productData: newProduct) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", String(productData.price));
    formData.append("picture", productData.picture);
    formData.append(
      "nutritionalValues",
      JSON.stringify(productData.nutritionalValues)
    );

    formData.append("active", String(productData.active));

    const response = await axios.post(`${server}/add_product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
export const deleteProduct = async (productId: string) => {
  return axios.delete(server + `/delete_product/${productId}`);
};
export const getProduct = async (productId: string) => {
  return axios.get(server + `/get_product/${productId}`);
};
export const toggleActive = async (productId: string) => {
  return axios.post(server + `/toggle_active/${productId}`);
};
export const editProduct = async (productData: product) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", String(productData.price));
    formData.append("picture", productData.picture);
    formData.append("product_id", productData.id);
    formData.append(
      "nutritionalValues",
      JSON.stringify(productData.nutritionalValues)
    );

    formData.append("active", String(productData.active));

    const response = await axios.post(`${server}/edit_product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
export const getLocations = async () => {
  return axios.get(server + "/get_locations");
};
export const deleteLocation = async (locationId: string) => {
  return axios.delete(server + `/delete_location/${locationId}`);
};

export const addLocation = async (locationName: string) => {
  return axios.post(server + "/add_location", { location_name: locationName });
};
export const getOrders = async () => {
  return axios.get(server + "/get_orders");
};
export const deleteOrder = async (orderId: string) => {
  return axios.delete(server + `/delete_order/${orderId}`);
};
export const getClients = async () => {
  return axios.get(server + "/get_clients");
};
export const deleteClient = async (clientId: string) => {
  return axios.delete(server + `/delete_client/${clientId}`);
};
