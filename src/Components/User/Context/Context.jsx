import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateServerCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating server cart:", error);
    }
  };

  // Add product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if product exists
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateServerCart(updatedCart);
    } else {
      // Add product to cart if it doesn't exist
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      updateServerCart(updatedCart);
    }
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateServerCart(updatedCart);

  };

  // Update product quantity in the cart
  const updateQuantity = (productId, increment = true) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
        }
        : item
    );
    updateServerCart(updatedCart);
  };

  // Clear the entire cart
  const clearCart = () => {
    updateServerCart([]);

  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
