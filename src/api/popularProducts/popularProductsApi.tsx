import { axiosApiInstance } from "@/configs/axiosApiInstance"

export const getPopularProducts = () => axiosApiInstance.get('/popularProducts')
export const createPopularProduct = (data: any) => axiosApiInstance.post('/popularProducts', data)
export const updatePopularProduct = (id: number, data: any) => axiosApiInstance.put(`/popularProducts/${id}`, data)
export const deletePopularProduct = (id: number) => axiosApiInstance.delete(`/popularProducts/${id}`)