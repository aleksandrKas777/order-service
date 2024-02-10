import { refreshApi } from "@/api/api.js";


export const storageName = {
  access: 'access',
  refresh: 'refresh',
  isRememberMe: 'isRememberMe',
}

export const refreshAuth = async (refreshToken) => {
  const {access_token, refresh_token: newRefreshToken} = await refreshApi({
    refresh_token: refreshToken,
  })
  
  const typeStorage = JSON.parse(localStorage.getItem(storageName.isRememberMe))
    ? localStorage
    : sessionStorage
  
  sessionStorage.setItem(storageName.access, JSON.stringify(access_token))
  typeStorage.setItem(storageName.refresh, JSON.stringify(newRefreshToken))
  // sessionStorage.removeItem(storageName.refresh)
  return access_token
}

export const logoutAuth = () => {
  localStorage.removeItem(storageName.isRememberMe)
  localStorage.removeItem(storageName.refresh)
  sessionStorage.removeItem(storageName.refresh)
  sessionStorage.removeItem(storageName.access)
}

export const loginAuth = ({isRememberMe, access_token, refresh_token}) => {
  const typeStorage = isRememberMe ? localStorage : sessionStorage
  
  localStorage.setItem(storageName.isRememberMe, JSON.stringify(isRememberMe))
  sessionStorage.setItem(storageName.access, JSON.stringify(access_token))
  typeStorage.setItem(storageName.refresh, JSON.stringify(refresh_token))
  
  // sessionStorage.removeItem(storageName.refresh)
  // localStorage.removeItem(storageName.refresh)
}
