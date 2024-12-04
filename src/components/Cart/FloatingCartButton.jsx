import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import './FloatingCartButton.css';

const FloatingCartButton = () => {
  const { user } = useAuth(); // Check user state
  const navigate = useNavigate();

  if (!user) return null; // null if user is not logged in

  return (
    <button className="floating-cart-button" onClick={() => navigate('/cart')}>
      🛒 View Cart
    </button>
  );
};

export default FloatingCartButton;
