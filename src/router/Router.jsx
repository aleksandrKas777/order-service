import { Route, Routes } from "react-router-dom"
import { routes } from "@/router/routes.jsx"
import { Layout } from "@/components/layout/Layout.jsx";

export const Router = () => {
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
