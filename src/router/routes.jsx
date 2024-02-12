import { Login } from "@/pages/login/Login.jsx";
import { Navigate } from "react-router-dom";
import { Orders } from "@/pages/orders/Orders";
import {UserIcon} from '@/assets/images/icons'
import { OrderAdd } from "@/pages/orders/OrderAdd";
import { OrderEdit } from "@/pages/orders/OrderEdit";
import { OrderInfo } from "@/pages/orders/OrderInfo";
import { ROLES } from "@/constants/roles.js";
import { Registration } from "@/pages/registration/Registration";

export const routes = [
  {
    path: '/login',
    private: false,
    element: <Login/>,
    roles: ROLES.ALL
  },
  {
    path: '/registration',
    private: false,
    element: <Registration/>,
    roles: ROLES.ALL
  },
  {
    path: '/orders',
    private: true,
    element: <Orders/>,
    navBar: true,
    title: 'Заказы',
    icon: <UserIcon />,
    roles: ROLES.ALL
  },
  {
    path: '/orders/add',
    private: true,
    element: <OrderAdd/>,
    roles: ROLES.USER
  },
  {
    path: '/orders/:id',
    private: true,
    element: <OrderInfo/>,
    roles: ROLES.ALL
  },
  {
    path: '/orders/:id/edit',
    private: true,
    element: <OrderEdit/>,
    roles: ROLES.ALL
  },
  {
    path: '*',
    element: <Navigate to={'/orders'} replace/>,
  },
]
