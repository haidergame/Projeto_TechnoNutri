import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Product from './Product'; // Página para adicionar produtos
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Product />} /> {/* Rota para adicionar produtos */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;