"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import Slider from "./Slider";
import Footer from "./Footer";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const sliderRef = useRef(null);

  // Add to Cart Function
  const addToCart = (product) => {
    try {
      setCartItems((prevItems) => [...prevItems, product]);

      // Show notification
      setNotification(`${product.name} added to cart!`);

      // Auto-hide after 2 seconds
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } catch (error) {
      setNotification("Failed to add item!");
    }
  };

  // Remove from Cart Function
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Toggle Cart Slider
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  // Close slider when clicking outside (except on Add to Cart button)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSliderOpen &&
        sliderRef.current &&
        !sliderRef.current.contains(event.target) &&
        !event.target.closest(".add-to-cart") // Prevent closing when clicking Add to Cart
      ) {
        setIsSliderOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSliderOpen]);

  return (
    <main className="relative">
      <Navbar toggleSlider={toggleSlider} />
      <HomePage addToCart={addToCart} />
      <div ref={sliderRef}>
        <Slider
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          isOpen={isSliderOpen}
          toggleSlider={toggleSlider}
        />
      </div>
      <Footer />

      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-10 right-10 bg-green-400 text-white px-4 py-2 rounded-md shadow-lg">
          {notification}
        </div>
      )}
    </main>
  );
}
