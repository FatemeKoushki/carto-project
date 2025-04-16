import { axiosApiInstance } from "@/configs/axiosApiInstance"

export const getSpecialOffersProducts = () => axiosApiInstance.get('/specialOffersProducts')
export const createSpecialOffersProduct = (data: any) => axiosApiInstance.post('/specialOffersProducts', data)
export const updateSpecialOffersProduct = (id: number, data: any) => axiosApiInstance.put(`/specialOffersProducts/${id}`, data)
export const deleteSpecialOffersProduct = (id: number) => axiosApiInstance.delete(`/specialOffersProducts/${id}`)