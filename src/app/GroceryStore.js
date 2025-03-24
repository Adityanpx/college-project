'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const products = [
  { id: 1, name: 'Tomato', price: 30, category: 'Vegetables', image: '/tomato.jpg' },
  { id: 2, name: 'Apple', price: 80, category: 'Fruits', image: '/apple.jpg' },
  { id: 3, name: 'Milk', price: 50, category: 'Dairy', image: '/milk.jpg' },
  { id: 4, name: 'Eggs', price: 60, category: 'Eggs', image: '/eggs.jpg' },
  { id: 5, name: 'Chicken', price: 250, category: 'Meat', image: '/chicken.jpg' },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Eggs', 'Meat'];

export default function GroceryStore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md p-4">
        <h1 className="text-xl font-bold">Grocery Store</h1>
        <button className="relative" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>
          )}
        </button>
      </nav>

      {/* Category Filter */}
      <div className="flex gap-3 p-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-32 object-cover rounded" />
            <h2 className="mt-2 font-bold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto"
        >
          <button onClick={() => setIsCartOpen(false)} className="text-red-500 font-bold">Close</button>
          <h2 className="text-lg font-bold mt-2">Cart Items</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
