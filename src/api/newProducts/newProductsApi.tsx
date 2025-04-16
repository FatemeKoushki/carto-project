
import { axiosApiInstance } from "@/configs/axiosApiInstance"

export const getNewProducts = () => axiosApiInstance.get('/newProducts')
export const createNewProduct = (data: any) => axiosApiInstance.post('/products', data)
export const updateNewProduct = (id: number, data: any) => axiosApiInstance.put(`/products/${id}`, data)
export const deleteNewProduct = (id: number) => axiosApiInstance.delete(`/products/${id}`)