import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// Types for our filter parameters
export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  memories?: string[];
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// Convert filter params to URL search params
export const filterParamsToSearchParams = (params: FilterParams): URLSearchParams => {
  const searchParams = new URLSearchParams();
  
  if (params.minPrice !== undefined) {
    searchParams.set('minPrice', params.minPrice.toString());
  }
  
  if (params.maxPrice !== undefined) {
    searchParams.set('maxPrice', params.maxPrice.toString());
  }
  
  if (params.brands && params.brands.length > 0) {
    searchParams.set('brands', params.brands.join(','));
  }
  
  if (params.memories && params.memories.length > 0) {
    searchParams.set('memories', params.memories.join(','));
  }
  
  if (params.sort) {
    searchParams.set('sort', params.sort);
  }
  
  if (params.page) {
    searchParams.set('page', params.page.toString());
  }
  
  if (params.limit) {
    searchParams.set('limit', params.limit.toString());
  }
  
  if (params.search) {
    searchParams.set('search', params.search);
  }
  
  return searchParams;
};

// Convert URL search params to filter params
export const searchParamsToFilterParams = (searchParams: URLSearchParams): FilterParams => {
  const params: FilterParams = {};
  
  const minPrice = searchParams.get('minPrice');
  if (minPrice) {
    params.minPrice = parseInt(minPrice, 10);
  }
  
  const maxPrice = searchParams.get('maxPrice');
  if (maxPrice) {
    params.maxPrice = parseInt(maxPrice, 10);
  }
  
  const brands = searchParams.get('brands');
  if (brands) {
    params.brands = brands.split(',');
  }
  
  const memories = searchParams.get('memories');
  if (memories) {
    params.memories = memories.split(',');
  }
  
  const sort = searchParams.get('sort');
  if (sort) {
    params.sort = sort;
  }
  
  const page = searchParams.get('page');
  if (page) {
    params.page = parseInt(page, 10);
  }
  
  const limit = searchParams.get('limit');
  if (limit) {
    params.limit = parseInt(limit, 10);
  }
  
  const search = searchParams.get('search');
  if (search) {
    params.search = search;
  }
  
  return params;
};

// Custom hook to manage URL-based filters
export const useUrlFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filter params from URL
  const getCurrentFilters = useCallback((): FilterParams => {
    return searchParamsToFilterParams(searchParams);
  }, [searchParams]);
  
  // Update filters in URL
  const updateFilters = useCallback((newParams: FilterParams) => {
    const currentParams = getCurrentFilters();
    const updatedParams = { ...currentParams, ...newParams };
    const searchParamsString = filterParamsToSearchParams(updatedParams).toString();
    
    // Update URL without refreshing the page
    router.push(`?${searchParamsString}`);
  }, [router, getCurrentFilters]);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    router.push('');
  }, [router]);
  
  return {
    filters: getCurrentFilters(),
    updateFilters,
    clearFilters
  };
}; 