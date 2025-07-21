import React from 'react';
import Card from './Card';

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <Card
          key={product.id || idx}
          image={product.image}
          name={product.name}
          brand={product.brand}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 