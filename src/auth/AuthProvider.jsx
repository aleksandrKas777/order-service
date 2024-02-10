import {createContext, useContext, useState} from 'react'
import {loginApi} from '../api/api'
import {loginAuth, logoutAuth} from './functionsAuth'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(() =>
    Boolean(
      sessionStorage.getItem('refresh') || localStorage.getItem('refresh'),
    ),
  )
  
  const logout = () => {
    logoutAuth()
    setIsLogged(false)
  }
  
  const login = async ({data, isRememberMe}) => {
    const {access_token, refresh_token} = await loginApi(data)
    
    loginAuth({isRememberMe, refresh_token, access_token})
    setIsLogged(true)
  }
  
  return (
    <AuthContext.Provider value={{isLogged, logout, login}}>
      {children}
    </AuthContext.Provider>
  )
}
