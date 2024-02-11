import { axiosAuth } from "@/api/axios.js";
import { axiosInstance } from "@/api/axiosInterceptors.js";

export const loginApi = (data) => axiosAuth.post('token/', data)
export const refreshApi = (token) =>  axiosAuth.post('token/refresh/', token)

export const getOrders = (params) => axiosInstance('orders/', {params})
export const getOrder = (id) => axiosInstance(`orders/${id}/`)
