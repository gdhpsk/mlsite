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
  const tabs = ['About', 'Levels', 'Leaderboard', 'Submit Record']
  let [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className="flex select-none flex-row items-center justify-between bg-slate-700 pr-12 opacity-100">
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
          <div className="" onClick={() => {
            setShow(!show)
          }}>
            <label tabIndex={0} className="btn-ghost btn">
              <HiMenu size={30} />
            </label>
            <div className={`absolute ${!show ? "hidden" : "block"} z-10 bg-slate-600`} style={{width: "min(300px, 100%)", height: "calc(100% - 60px)", marginTop: "15px", marginLeft: "-222px"}}>
              <br></br>
              <h1 className="text-white text-center text-3xl">GD Mobile List</h1>
              <br></br>
              <hr/>
              <br></br>
            {Object.keys(routes).map((r, i) => (<>
                <p
                  key={`link-${i}`}
                  onClick={() => {
                    navigate(routes[r])
                    setShow(false)
                  }}
                  className="text-white p-4 text-xl border-double"
                >
                  {tabs[i]}
                </p>
                <br></br>
              </>))}
            </div>  
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
