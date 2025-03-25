"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserCheck } from "react-icons/fa";

import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ toggleSlider }) {
  return (
    <nav className="py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex h-18 items-center gap-3">
        <Image src="/grocery_logo.png" height={90} width={100} alt="logo" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-lg font-semibold">
        <Link href="/" className="hover:text-green-500  transition -underline-offset-1">
          Home
        </Link>
        <Link href="/categories" className="hover:text-green-500 transition">
          Categories
        </Link>
        
        <Link href="/contact" className="hover:text-green-500 transition">
          About Us
        </Link>
      </div>

      {/* User Dropdown & Cart */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
          <FaUserCheck />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-md p-2 rounded-md">
            <DropdownMenuItem asChild>
              <Link href="/register" className="block w-full px-4 py-2 hover:bg-gray-100">
                Register
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login" className="block w-full px-4 py-2 hover:bg-gray-100">
                Login
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add to Cart Button */}
        <button
          onClick={toggleSlider}
          className="relative cursor-pointer   bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition shadow-md flex items-center gap-2"
        >
          🛒 Cart Items
        </button>
      </div>
    </nav>
  );
}
