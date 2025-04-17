'use client'
import { useFilterStore } from '../hooks/useFilters'
import { useState, useEffect } from 'react'
import { useUrlFilters } from '@/utils/urlFilters'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

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

  const toPersianNumber = (number: number): string => {
    if (number == null) return '';

  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  
  // تبدیل عدد به رشته و اضافه‌کردن جداکننده سه‌رقمی
  const parts = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬') // استفاده از "٬" جداکننده فارسی
    .split('');

  // تبدیل ارقام به فارسی
  return parts
    .map((char) => (/\d/.test(char) ? persianDigits[char] : char))
    .join('');
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-6">
      <div>
        <h4 className="font-semibold mb-2">قیمت (تومان)</h4>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>حداقل: {toPersianNumber(localPrice[0])}</span>
            <span>حداکثر: {toPersianNumber(localPrice[1])}</span>
          </div>
          <div className="px-2" style={{ direction: 'rtl' }}>
            <Slider
              range
              min={0}
              max={100000000}
              value={localPrice}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  handlePriceChange(value as [number, number])
                }
              }}
              allowCross={false}
              railStyle={{ backgroundColor: '#e5e7eb', height: '4px' }}
              trackStyle={[{ backgroundColor: 'var(--primary)', height: '4px' }]}
              marks={{
                0: <span className="text-xs">{toPersianNumber(0)}</span>,
                30000000: <span className="text-[10px]">{toPersianNumber(30000000)}</span>,
                50000000: <span className="text-[10px]">{toPersianNumber(50000000)}</span>,
                75000000: <span className="text-[10px]">{toPersianNumber(7500000)}</span>,
                100000000: <span className="text-[10px]">{toPersianNumber(100000000)}</span>
              }}
              step={1000000}
              reverse
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">برندها</h4>
        <input
          type="text"
          placeholder="جستجوی برند"
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
        <h4 className="font-semibold mb-2">حافظه</h4>
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
