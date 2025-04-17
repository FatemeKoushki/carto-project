"use client"
import Product from '@/components/ui/main/cardProduct'
import { useUrlFilters } from '@/utils/urlFilters'

const dummyProducts = [
  {id : 1 , name: 'Iphone 15 pro max', price: 789850, image: '/assets/iphones.png', brand: 'Apple', memory: '512GB'  , discount : "10" },
  {id : 2 , name: 'Galaxy S24+', price: 989910, oldPrice: 999910, image: '/assets/phone1.png', brand: 'Samsung', memory: '256GB' , discount : "10" },
  {id : 3 , name: 'Galaxy Note 12', price: 889910, image: '/assets/phone2.png', brand: 'Samsung', memory: '128GB' , discount : "10" },
  {id : 4 , name: 'Galaxy S10', price: 689910, image: '/assets/phone3.png', brand: 'Samsung', memory: '64GB' , discount : "10" },
  {id : 5 , name: 'iPhone 13 mini', price: 489910, image: '/assets/phone4.png', brand: 'Apple', memory: '128GB' , discount : "10" },
  {id : 6 , name: 'Mi 11 Lite', price: 589910, image: '/assets/phone5.png', brand: 'Xiaomi', memory: '128GB' , discount : "10" },
]

export default function ProductList() {
  const { filters } = useUrlFilters()

  // Filter products based on URL parameters
  const filteredProducts = dummyProducts.filter(product => {
    const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
                        (!filters.maxPrice || product.price <= filters.maxPrice)
    const matchesBrand = !filters.brands?.length || filters.brands.includes(product.brand)
    const matchesMemory = !filters.memories?.length || filters.memories.includes(product.memory)
    
    // Search filter - check if product name or brand contains the search query
    const searchQuery = filters.search?.toLowerCase() || '';
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery) || 
      product.brand.toLowerCase().includes(searchQuery);
    
    return matchesPrice && matchesBrand && matchesMemory && matchesSearch;
  })

  // Sort products based on URL filter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'newest':
        return b.id - a.id;
    
      default:
        return 0; // featured - no sorting
    }
  });

  return (
    <div>
      {sortedProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}