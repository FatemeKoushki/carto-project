"use client"
import { useState } from 'react'
import FilterSidebar from './components/FilterSidebar'
import ProductList from './components/ProductList'
import SortDropdown from './components/SortDropdown'
import { CiFilter } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useUrlFilters } from '@/utils/urlFilters'

export default function SearchPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { filters, updateFilters } = useUrlFilters()
  
  const handleFilterSelect = () => {
    setIsSidebarOpen(false);
  }
  
  const handleSortChange = (sortOption: string) => {
    updateFilters({ sort: sortOption })
  }
  
  return (
    <main className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6 required:">
      {/* Sidebar */}
      <aside className="lg:hidden">
        <CiFilter className='text-2xl top-3 left-3 absolute' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <aside className={`fixed w-screen h-screen top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <IoMdClose className='text-2xl top-3 left-3 absolute' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <FilterSidebar onFilterSelect={handleFilterSelect} />
        </aside>
      </aside>
    
      <aside className={` hidden lg:block lg:w-1/4 `}>
        <FilterSidebar />
      </aside>

      {/* Main Content */}
      <section className="w-full lg:w-3/4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {filters.search 
                ? `نتیجه جستجوی  برای :"${filters.search}"` 
                : "نتایج جستجو "}
            </h2>
            <p className="text-gray-500">
              {Object.keys(filters).length > 0 
                ? "محصولات فیلتر شده" 
                : "همه محصولات"}
            </p>
          </div>
          <SortDropdown onSortChange={handleSortChange} currentSort={filters.sort} />
        </div>
        <ProductList />
      </section>
    </main>
  )
}

