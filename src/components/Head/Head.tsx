"use client";
import Link from "next/link";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { useState } from "react";
import SearchBox from "../searchBox/searchBox";

export default function Head() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            کارتو
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-primary">
              صفحه اصلی
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary">
              محصولات
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              درباره ما
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              تماس با ما
            </Link>
          </nav>

          {/* Search box - visible on both mobile and desktop */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBox />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/cart" className="text-gray-700 hover:text-primary relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/wishlist" className="text-gray-700 hover:text-primary">
              <FiHeart size={20} />
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-primary">
              <FiUser size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                صفحه اصلی
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                محصولات
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                درباره ما
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                تماس با ما
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}