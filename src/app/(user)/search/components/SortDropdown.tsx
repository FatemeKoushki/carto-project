'use client'

interface SortDropdownProps {
  onSortChange?: (value: string) => void;
  currentSort?: string;
}

export default function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(e.target.value);
  }

  return (
    <select 
      className="border px-2 py-1 rounded"
      value={currentSort || 'name'}
      onChange={handleChange}
    >
      <option value="name">Sort by name</option>
      <option value="price-low">Price low to high</option>
      <option value="price-high">Price high to low</option>
    </select>
  )
}