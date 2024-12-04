import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="cart">
      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={e => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default Cart;
