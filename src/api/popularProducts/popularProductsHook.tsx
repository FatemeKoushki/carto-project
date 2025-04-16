"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPopularProduct, getPopularProducts, deletePopularProduct,updatePopularProduct } from './popularProductsApi'

export const usePopularProducts = () => {
  return useQuery({
    queryKey: ['popularProducts'],
    queryFn: getPopularProducts,
    select: (res) => res.data,
  })
}

export const useCreatePopularProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: createPopularProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['popularProducts'] })
      },
    })
  }

  export const useUpdatePopularProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, data }: { id: number, data: any }) => updatePopularProduct(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['popularProducts'] })
      },
    })
}

export const useDeletePopularProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: deletePopularProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['popularProducts'] })
      },
    })
}