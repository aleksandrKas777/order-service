import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { routes } from "@/router/routes.jsx"
import { Layout } from "@/components/layout/Layout.jsx";
import { useAuth } from "@/auth/AuthProvider.jsx";
import { useEffect } from "react";

export const Router = () => {
  const {isLogged} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if (!isLogged && location.pathname !== '/registration' ) navigate('/login')
    if (isLogged && location.pathname === '/login') navigate('/orders')
  }, [isLogged])
  
  return (
    <Routes>
      {routes.map((item) => {
        if (item.private)
          return (
            <Route
              path={item.path}
              key={item.path}
              element={<Layout>{item.element}</Layout>}
            />
          )
        return (
          <Route key={item.path} path={item.path} element={item.element} />
        )
      })}
    </Routes>
  )
}
