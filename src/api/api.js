import { axiosAuth } from "@/api/axios.js";

export const loginApi = (data) =>  axiosAuth.post('accounts/login/admin', data)
export const refreshApi = (token) =>  axiosAuth.post('accounts/refresh', token)
