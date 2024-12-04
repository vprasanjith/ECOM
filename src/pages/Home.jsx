import React from 'react';
import { useAuth } from '../components/Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/Products/ProductList';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-page">
      <section className="main-section">
        <div className="main-content">
          {user ? (
            <>
              {/* Content when logged-in */}
              <h2>Welcome, {user.name}!</h2>
              <p>Here are some of our products choosed just for you:</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Content when yet to log in */}
              <h2>Welcome to ShopEase!</h2>
              <p>
                A wide range of products choosed just for you. From the international market 
                to you, find everything you need at affordable prices.
              </p>
              <div className="auth-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Products list */}
      {user && (
        <section id="products" className="products-section">
          <h2>Featured Products</h2>
          <ProductList />
        </section>
      )}
    </div>
  );
};

export default Home;
