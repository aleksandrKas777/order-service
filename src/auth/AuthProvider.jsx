import { createContext, useContext, useState } from 'react'
import { loginApi } from '../api/api'
import { loginAuth, logoutAuth } from './functionsAuth'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() =>
    Boolean(localStorage.getItem('refresh')),
  )
  
  const logout = () => {
    logoutAuth()
    setIsLogged(false)
  }
  
  const login = async ({ data }) => {
    const {data: {access, refresh}} = await loginApi(data)
    const {role} = jwtDecode(access)
   
    loginAuth({ access, refresh, role })
    setIsLogged(true)
  }
  
  return (
    <AuthContext.Provider value={{ isLogged, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}
