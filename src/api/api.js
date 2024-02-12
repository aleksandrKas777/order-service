import { axiosAuth } from "@/api/axios.js";
import { axiosInstance } from "@/api/axiosInterceptors.js";

export const loginApi = (data) => axiosAuth.post('api/token/', data)
export const refreshApi = (token) =>  axiosAuth.post('api/token/refresh/', token)
export const registrationApi = (data) =>  axiosAuth.post('accounts/', data)

export const getOrders = (params) => axiosInstance('orders/', {params})
export const getOrder = (id) => axiosInstance(`orders/${id}/`)
export const createOrder = (data) => axiosInstance.post('orders/', data)

export const patchOrder = ({id, data}) => axiosInstance.patch(`orders/${id}/`, data)

export const getCouriers = () => axiosInstance('couriers/')
