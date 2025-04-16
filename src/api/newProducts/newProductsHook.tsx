"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNewProduct, deleteNewProduct, getNewProducts, updateNewProduct } from './newProductsApi'

export const useNewProducts = () => {
  return useQuery({
    queryKey: ['newProducts'],
    queryFn: getNewProducts,
    select: (res) => res.data,
  })
}

export const useCreateNewProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: createNewProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['newProducts'] })
      },
    })
  }

  export const useUpdateNewProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, data }: { id: number, data: any }) => updateNewProduct(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['newProducts'] })
      },
    })
}

export const useDeleteNewProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: deleteNewProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['newProducts'] })
      },
    })
}