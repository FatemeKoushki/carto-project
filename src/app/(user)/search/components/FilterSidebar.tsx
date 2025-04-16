'use client'
import { useFilterStore } from '../hooks/useFilters'
import { useState, useEffect } from 'react'
import { useUrlFilters } from '@/utils/urlFilters'

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Sony', 'Motorola', 'Nokia', 'LG']
const memories = ['1TB', '512GB', '256GB', '128GB', '64GB', '32GB']

interface FilterSidebarProps {
  onFilterSelect?: () => void;
}

export default function FilterSidebar({ onFilterSelect }: FilterSidebarProps) {
  const { price, setPrice, brands: selectedBrands, memories: selectedMemories, toggleBrand, toggleMemory } = useFilterStore()
  const [localPrice, setLocalPrice] = useState<[number, number]>(price)
  const { filters, updateFilters } = useUrlFilters()

  // Update local price when global price changes
  useEffect(() => {
    setLocalPrice(price)
  }, [price])

  // Sync URL filters with local state on initial load
  useEffect(() => {
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const newMinPrice = filters.minPrice !== undefined ? filters.minPrice : price[0]
      const newMaxPrice = filters.maxPrice !== undefined ? filters.maxPrice : price[1]
      setLocalPrice([newMinPrice, newMaxPrice])
      setPrice([newMinPrice, newMaxPrice])
    }

    if (filters.brands && filters.brands.length > 0) {
      // Clear all brands first
      selectedBrands.forEach(brand => {
        if (!filters.brands?.includes(brand)) {
          toggleBrand(brand)
        }
      })
      
      // Then add the ones from URL
      filters.brands.forEach(brand => {
        if (!selectedBrands.includes(brand)) {
          toggleBrand(brand)
        }
      })
    }

    if (filters.memories && filters.memories.length > 0) {
      // Clear all memories first
      selectedMemories.forEach(mem => {
        if (!filters.memories?.includes(mem)) {
          toggleMemory(mem)
        }
      })
      
      // Then add the ones from URL
      filters.memories.forEach(mem => {
        if (!selectedMemories.includes(mem)) {
          toggleMemory(mem)
        }
      })
    }
  }, [])

  // Price changes don't automatically close the sidebar
  const handlePriceChange = (newPrice: [number, number]) => {
    setLocalPrice(newPrice)
    setPrice(newPrice)
    
    // Update URL with new price range
    updateFilters({
      minPrice: newPrice[0],
      maxPrice: newPrice[1]
    })
    
    // No onFilterSelect call here for price changes
  }

  const handleBrandToggle = (brand: string) => {
    toggleBrand(brand)
    
    // Update URL with new brand selection
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand]
    
    updateFilters({
      brands: updatedBrands
    })
    
    onFilterSelect?.()
  }

  const handleMemoryToggle = (mem: string) => {
    toggleMemory(mem)
    
    // Update URL with new memory selection
    const updatedMemories = selectedMemories.includes(mem)
      ? selectedMemories.filter(m => m !== mem)
      : [...selectedMemories, mem]
    
    updateFilters({
      memories: updatedMemories
    })
    
    onFilterSelect?.()
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Price</h4>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Min: {localPrice[0]}</span>
            <span>Max: {localPrice[1]}</span>
          </div>
          <div className="relative w-full h-6">
            <input
              type="range"
              min={0}
              max={1000000}
              value={localPrice[0]}
              onChange={(e) => {
                const minValue = parseInt(e.target.value)
                if (minValue <= localPrice[1]) {
                  handlePriceChange([minValue, localPrice[1]])
                }
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none"
            />
            <input
              type="range"
              min={0}
              max={1000000}
              value={localPrice[1]}
              onChange={(e) => {
                const maxValue = parseInt(e.target.value)
                if (maxValue >= localPrice[0]) {
                  handlePriceChange([localPrice[0], maxValue])
                }
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none"
            />
            <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 -translate-y-1/2"></div>
            <div 
              className="absolute h-1 bg-primary rounded top-1/2 -translate-y-1/2"
              style={{
                left: `${(localPrice[0] / 1000000) * 100}%`,
                right: `${100 - (localPrice[1] / 1000000) * 100}%`
              }}
            ></div>
            <div 
              className="absolute w-4 h-4 bg-primary rounded-full top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${(localPrice[0] / 1000000) * 100}%` }}
            ></div>
            <div 
              className="absolute w-4 h-4 bg-primary rounded-full top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${(localPrice[1] / 1000000) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <input
            type="number"
            value={localPrice[0]}
            onChange={(e) => {
              const minValue = parseInt(e.target.value) || 0;
              if (minValue <= localPrice[1]) {
                handlePriceChange([minValue, localPrice[1]]);
              }
            }}
            className="w-24 border rounded px-2 py-1"
            min={0}
          />
          <span>to</span>
          <input
            type="number"
            value={localPrice[1]}
            onChange={(e) => {
              const maxValue = parseInt(e.target.value) || 0;
              if (maxValue >= localPrice[0]) {
                handlePriceChange([localPrice[0], maxValue]);
              }
            }}
            className="w-24 border rounded px-2 py-1"
            min={0}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Brands</h4>
        <input
          type="text"
          placeholder="search brands"
          className="mb-2 w-full border rounded px-2 py-1"
        />
        {brands.map(brand => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandToggle(brand)}
            />{' '}
            {brand}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Memory</h4>
        {memories.map(mem => (
          <label key={mem} className="block">
            <input
              type="checkbox"
              checked={selectedMemories.includes(mem)}
              onChange={() => handleMemoryToggle(mem)}
            />{' '}
            {mem}
          </label>
        ))}
      </div>
    </div>
  )
}
