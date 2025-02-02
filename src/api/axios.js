import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`

export const axiosInstanceBase = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
})
export const axiosAuth = axios.create({
  baseURL: `${BASE_URL}/api/v1/`
})

