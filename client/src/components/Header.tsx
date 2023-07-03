import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../primitives/navigation-menu'

interface HeaderProps {
  name: string
  routes: {
    [display: string]: string
  }
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { name, routes } = props
  const tabs = ['About', 'Leaderboard', 'Submit Record']
  let [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className="flex select-none flex-row items-center justify-between bg-slate-700 pr-12">
      <div className="h-full cursor-pointer p-4 text-xl text-white hover:bg-slate-800" onClick={() => navigate('/')}>
        {name}
      </div>
      {window.innerWidth > 992 ? (
        <NavigationMenu>
          <NavigationMenuList>
            {Object.keys(routes).map((r, i) => (
              <NavigationMenuItem key={`nav-${i}`}>
                <div
                  className="cursor-pointer p-4 text-white hover:bg-slate-800"
                  onClick={() => {
                    navigate(routes[r])
                  }}
                >
                  {tabs[i]}
                </div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <div className="flex-none">
          <NavigationMenu></NavigationMenu>
          <div className="" onClick={() => setShow(!show)}>
            <label tabIndex={0} className="btn-ghost btn">
              <HiMenu size={30} />
            </label>
            <ul tabIndex={0} className="z-60 dropdown-content menu rounded-box bg-white" hidden={!show}>
              {Object.keys(routes).map((r, i) => (
                <li
                  key={`link-${i}`}
                  onClick={() => {
                    navigate(routes[r])
                    setShow(false)
                  }}
                >
                  <a className="text-white">{tabs[i]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
