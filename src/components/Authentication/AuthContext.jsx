import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Register function
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExists = users.some((u) => u.email === email);

    if (isUserExists) {
      alert('User already exists!');
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    return true;
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const authenticatedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // if (user) {
    //   localStorage.removeItem(`cart_${user.email}`); // Remove cart data when logging out
    // }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
