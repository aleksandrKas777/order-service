import {NavLink} from 'react-router-dom'

export const Breadcrumbs = ({crumbs}) => {
  return (
    <div className={'text-start mb-3'}>
      {crumbs.map((item, index) => {
        const className = (index === 0 && 'fs-5') || undefined
        if (item.link)
          return (
            <NavLink
              className={`${className} text-success text-underline`}
              key={index}
              to={item.link}
            >
              {item.title}
            </NavLink>
          )
        else
          return (
            <span key={index}>
              {index !== 0 && <span className={'mx-1'}>{'>'}</span>}
              <span key={index} className={className}>
                {item.title}
              </span>
            </span>
          )
      })}
    </div>
  )
}
