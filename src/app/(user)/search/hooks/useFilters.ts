import { create } from 'zustand'

interface FilterState {
  price: [number, number]
  brands: string[]
  memories: string[]
  setPrice: (range: [number, number]) => void
  toggleBrand: (brand: string) => void
  toggleMemory: (memory: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  price: [0, 1000000],
  brands: [],
  memories: [],
  setPrice: (range) => set({ price: range }),
  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),
  toggleMemory: (memory) =>
    set((state) => ({
      memories: state.memories.includes(memory)
        ? state.memories.filter((m) => m !== memory)
        : [...state.memories, memory],
    })),
}))