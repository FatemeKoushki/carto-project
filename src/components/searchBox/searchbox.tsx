"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  memory: string;
  discount: string;
  oldPrice?: number;
}

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch product suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch("/api/search?q=" + encodeURIComponent(searchQuery));
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        // Fallback to local data if API fails
        const response = await fetch("/db.json");
        const data = await response.json();
        const allProducts = data.allProducts || [];
        
        const filteredProducts = allProducts.filter((product: Product) => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setSuggestions(filteredProducts.slice(0, 5));
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    router.push(`/search?search=${encodeURIComponent(product.name)}`);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex justify-center items-center border rounded-lg h-8 text-center w-full">
        <input
          type="text"
          className="outline-0 focus:outline-0 mx-2 bg-transparent w-full"
          placeholder="جستجو کنید"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button 
          type="submit"
          className="bg-primary flex justify-center items-center h-8 rounded-lg w-8 cursor-pointer"
        >
          <FiSearch size={15} className="text-slate-100" />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && (searchQuery.trim().length > 0 || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto border border-gray-200">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">در حال جستجو...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((product) => (
                <li 
                  key={product.id} 
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="w-12 h-12 relative">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-right">{product.name}</div>
                    <div className="text-sm text-gray-500 text-right">{product.brand} • {product.memory}</div>
                    <div className="text-sm font-medium text-right">
                      {product.price.toLocaleString()} تومان
                      {product.oldPrice && (
                        <span className="text-xs text-gray-500 line-through mr-2">
                          {product.oldPrice.toLocaleString()} تومان
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">محصولی یافت نشد</div>
          )}
        </div>
      )}
    </div>
  );
}