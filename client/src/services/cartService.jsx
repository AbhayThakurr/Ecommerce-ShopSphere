// services/cartService.js
import axios from "axios";

const API_URL = "http://localhost:8080/cart";

export const addToCart = async (productId, quantity, token) => {
  return await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    {
      headers: { Authorization: token },
    }
  );
};

export const getCart = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: token },
  });
};
