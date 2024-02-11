import { refreshApi } from "@/api/api.js";


export const storageName = {
  access: 'access',
  refresh: 'refresh',
  role: 'role'
}

export const refreshAuth = async (refreshToken) => {
  const {access, refresh: newRefreshToken} = await refreshApi({
    refresh_token: refreshToken,
  })
  localStorage.setItem(storageName.access, JSON.stringify(access))
  localStorage.setItem(storageName.refresh, JSON.stringify(newRefreshToken))
  return access
}

export const logoutAuth = () => {
  localStorage.removeItem(storageName.refresh)
  localStorage.removeItem(storageName.access)
  localStorage.removeItem(storageName.role)
}

export const loginAuth = ({access, refresh, role}) => {
  localStorage.setItem(storageName.role, JSON.stringify(role))
  localStorage.setItem(storageName.access, JSON.stringify(access))
  localStorage.setItem(storageName.refresh, JSON.stringify(refresh))
}
