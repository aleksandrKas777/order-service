import { axiosInstanceBase as axiosInstance } from './axios.js'
import { refreshAuth } from "@/auth/functionsAuth.js";

let isAlreadyFetchingAccessToken = false

let subscribers = []

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getToken()
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    
    const { config, response } = error
    const originalRequest = config
    
    if (response?.status === 401) {
      
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true
        
        refreshToken()
          .then(({ data }) => {
            isAlreadyFetchingAccessToken = false
            setToken(data.access)
            setRefreshToken(data.refresh)
            onAccessTokenFetched(data.access)
          }).catch(() => {
          logout()
        })
      }
      
      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          resolve(axiosInstance(originalRequest))
        })
      })
      return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)


function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter((callback) =>
    callback(accessToken)
  )
}

function addSubscriber(callback) {
  this.subscribers.push(callback)
}

function getToken() {
  return JSON.parse(localStorage.getItem('access'))
}

// function getRefreshToken() {
//   return JSON.parse(localStorage.getItem('refresh'))
// }

function setToken(value) {
  localStorage.setItem('access', JSON.stringify(value))
}

function setRefreshToken(value) {
  localStorage.setItem('refresh', JSON.stringify(value))
}

// function login(data) {
//   return AuthState.login(data)
// }

async function refreshToken() {
  const refreshToken = JSON.parse(localStorage.getItem('refresh'))
  if (!refreshToken) return
  return await refreshAuth(refreshToken)
}

function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('role')
  isAlreadyFetchingAccessToken = false
  // window.location.href = ('/login')
}


export { axiosInstance }
