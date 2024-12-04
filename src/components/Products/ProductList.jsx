import React from 'react';
import { products } from './ProductData';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => (
  <div className="product-list">
    {products.map(product => <ProductCard key={product.id} product={product} />)}
  </div>
);

export default ProductList;
