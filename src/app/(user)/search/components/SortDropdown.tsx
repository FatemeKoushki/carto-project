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
      value={currentSort || 'featured'}
      onChange={handleChange}
    >
      <option value="newest">جدیدترین ها</option>
      <option value="price-low">قیمت: کم به زیاد</option>
      <option value="price-high">قیمت: زیاد به کم</option>
    </select>
  )
}