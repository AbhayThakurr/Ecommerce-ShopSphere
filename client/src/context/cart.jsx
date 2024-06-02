// /* eslint-disable react/prop-types */

// // context/CartContext.js
// import { createContext, useState, useContext, useEffect } from "react";
// import { getCart } from "../services/cartService";

// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("auth");
//       if (token) {
//         try {
//           const { data } = await getCart(token);
//           setCart(data);
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
