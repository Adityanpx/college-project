"use client";
import Image from "next/image";

export default function Navbar({ toggleSlider }) {
  return (
    <nav className="     py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src="/grocery_logo.png" height={90} width={100} alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-lg font-semibold">
        <a href="#" className="hover:text-yellow-300 transition">Home</a>
        <a href="#" className="hover:text-yellow-300 transition">Categories</a>
        <a href="#" className="hover:text-yellow-300 transition">Offers</a>
        <a href="#" className="hover:text-yellow-300 transition">Contact</a>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={toggleSlider}
        className="relative bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition shadow-md flex items-center gap-2"
      >
        🛒 Cart Items
        
      </button>
    </nav>
  );
}
