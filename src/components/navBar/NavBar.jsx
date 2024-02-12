import { NavLink, useLocation } from 'react-router-dom'
import { routes } from "@/router/routes.jsx";
import { ROLES } from "@/constants/roles";
import { Button } from "react-bootstrap";
import { useAuth } from "@/auth/AuthProvider.jsx";

export const NavBar = () => {
  const location = useLocation()
  const role = JSON.parse(localStorage.getItem('role'))
  const navItems = routes.filter((item) => item.navBar && (item.roles === ROLES.ALL || role === item.roles))
  
  const {logout} = useAuth()
  
  return (
    <nav className="px-4 bg-white vh-100 shadow py-3 sticky-top d-flex justify-content-between flex-column">
      <div>
        <NavLink to="/" className="mb-4 d-flex text-decoration-none gap-3">
          {/*<LogoIcon width={30} />*/}
          <h4 className={'text-decoration-none text-black mb-0 text-nowrap'}>Order Service</h4>
        </NavLink>
        <ul className={'d-flex flex-column p-0'}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`d-flex text-decoration-none align-items-center gap-3 px-2 rounded-2 py-2 fw-medium ${
                  location.pathname.includes(item.path)
                    ? 'bg-success text-white nav-active'
                    : 'text-secondary nav'
                }`}
              >
                {item.icon}
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button className={'w-100'} variant={'secondary'} onClick={logout}>Выход</Button>
    </nav>
  )
}
