import {useLocation} from 'react-router-dom'
import { NavBar } from "@/components/navBar/NavBar.jsx";

// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => {
  const location = useLocation()
  return (
    <div className={'d-flex'}>
      {location.pathname !== '/login' && <NavBar />}
      <div className={'p-3'} style={{boxSizing: 'border-box'}}>{children}</div>
    </div>
  )
}
