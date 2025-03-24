import React, { useState } from "react";

// Product Data with Categories & Reliable Image Links
const products = [
  { id: 1, name: "Apples", price: 2.99, image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", category: "Fruits" },
  { id: 2, name: "Bananas", price: 1.49, image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg", category: "Fruits" },
  { id: 4, name: "Oranges", price: 2.89, image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg", category: "Fruits" },

  { id: 6, name: "Tomatoes", price: 3.49, image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg", category: "Vegetables" },
  { id: 7, name: "Broccoli", price: 2.99, image: "/broccoli.jpg", category: "Vegetables" },
  { id: 8, name: "Potatoes", price: 1.29, image: "/potato.webp", category: "Vegetables" },

  { id: 9, name: "Milk", price: 4.99, image: "milk.jpg", category: "Dairy" },
  { id: 10, name: "Cheese", price: 5.49, image: "cheese.jpg", category: "Dairy" },

  { id: 12, name: "Bread", price: 2.79, image: "BREAD.jpg", category: "Bakery" },

  { id: 14, name: "Chips", price: 2.49, image: "chips.jpg", category: "Snacks" },
];

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Snacks"];

const HomePage = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === category
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-lg text-center transition hover:scale-105"
          >
            <img
              src={product.image}
              width={150}
              height={150}
              alt={product.name}
              className="mx-auto rounded-lg"
            />
            <h3 className="text-lg font-semibold text-gray-900 mt-2">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
