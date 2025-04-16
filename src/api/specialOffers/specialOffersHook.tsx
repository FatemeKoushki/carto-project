"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSpecialOffersProduct, getSpecialOffersProducts, deleteSpecialOffersProduct,updateSpecialOffersProduct } from './specialOffersApi'

export const useSpecialOffersProductas = () => {
  return useQuery({
    queryKey: ['specialOffersProducts'],
    queryFn: getSpecialOffersProducts,
    select: (res) => res.data,
  })
}

export const useCreateSpecialOffersProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: createSpecialOffersProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['specialOffersProducts'] })
      },
    })
  }

  export const useUpdateSpecialOffersProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, data }: { id: number, data: any }) => updateSpecialOffersProduct(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['specialOffersProducts'] })
      },
    })
}

export const useDeleteSpecialOffersProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: deleteSpecialOffersProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['specialOffersProducts'] })
      },
    })
}