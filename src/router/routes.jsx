import { Login } from "@/pages/Login.jsx";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: '/login',
    private: false,
    element: <Login/>
  },
  {
    path: '*',
    element: <Navigate to={'/agencies'} replace/>,
  },
]
