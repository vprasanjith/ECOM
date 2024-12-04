import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './components/Cart/CartContext';
import { AuthProvider } from './components/Authentication/AuthContext';
import './index.css';
import './styles/global.css';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
