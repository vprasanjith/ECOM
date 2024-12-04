import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // from AuthContext
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`));
      if (storedCart) {
        setCart(storedCart);
      }
      else{
        setCart([]);
      }
    }
  }, [user]); // Run when user changes

  // Function to update cart
  const updateCart = (newCart) => {
    if (user) {
      setCart(newCart);
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(newCart)); // Store cart for the specific user
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    updateCart(updatedCart);
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
