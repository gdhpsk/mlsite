'use client';
import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '../primitives/navigation-menu'

interface HeaderProps {
  name: string
  main: {
    [display: string]: string
  }
  additional: {
    [display: string]: string
  }
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { name, main, additional } = props
  const [mainTabs, additionalTabs] = [['About', 'Levels', 'Legacy', 'Leaderboard', 'Submit Record'], ['FAQ', 'Roulette', 'Changelog', "AME", "Packs"]]
  let [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate()
  let [scrollable, setScrollable] = useState("")
  useEffect(() => {
    if(!scrollable) {
      setScrollable(document.body.style.overflow)
    }
  }, [document.body.style.overflow])

  useEffect(() => {
    if(show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = scrollable
    }
  }, [show])

  return (
    <>
    <div className="flex select-none flex-row items-center justify-between bg-slate-700 pr-12 opacity-100">
      <div className="h-full cursor-pointer p-4 text-xl text-white hover:bg-slate-800" onClick={() => navigate('/')}>
        {name}
      </div>
      {window.innerWidth > 992 ? (
        <NavigationMenu>
          <NavigationMenuList>
            {Object.keys(main).map((r, i) => (
              <NavigationMenuItem key={`nav-${i}`}>
                <div
                  className="cursor-pointer p-4 text-white hover:bg-slate-800"
                  onClick={() => {
                    navigate(main[r])
                  }}
                >
                  {mainTabs[i]}
                </div>
              </NavigationMenuItem>
            ))}
             {Object.keys(additional).map((r, i) => ( 
              <NavigationMenuItem key={`nav-${i}`}>
                <div
                  className="cursor-pointer p-4 text-white hover:bg-slate-800"
                  onClick={() => {
                    navigate(additional[r])
                  }}
                >
                  {additionalTabs[i]}
                </div>
              </NavigationMenuItem>
            ))}
            <div
                  className="cursor-pointer p-4 text-white hover:bg-slate-800"
                  onClick={() => document.getElementById("login-form-button").click()}
                >
                  Login
                </div>
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
            <div className={`absolute ${!show ? "hidden" : "block"} bg-slate-600 z-50 overflow-y-scroll`} style={{width: "min(300px, 100%)", height: "calc(100% - 60px)", marginTop: "15px", marginLeft: "-222px"}}>
              <br></br>
              <h1 className="text-white text-center text-3xl">GD Mobile List</h1>
              <br></br>
              <hr/>
              <br></br>
              <h1 className="text-white text-center text-2xl">Main Info</h1>
              <br></br>
            {Object.keys(main).map((r, i) => (<>
                <p
                  key={`link-${i}`}
                  onClick={() => {
                    navigate(main[r])
                    setShow(false)
                  }}
                  className="text-white p-4 text-xl border-double"
                >
                  {mainTabs[i]}
                </p>
                <br></br>
              </>))}
              <br></br>
              <h1 className="text-white text-center text-2xl">Additional Info</h1>
              <br></br>
              {Object.keys(additional).map((r, i) => (<>
                <p
                  key={`link-${i}`}
                  onClick={() => {
                    navigate(additional[r])
                    setShow(false)
                  }}
                  className="text-white p-4 text-xl border-double"
                >
                  {additionalTabs[i]}
                </p>
                <br></br>
              </>))}
              <p
                  className="text-white p-4 text-xl border-double"
                  onClick={() => document.getElementById("login-form-button").click()}
                >
                  Login
                  </p>
            </div>  
          </div>
        </div>
      )}
    </div>
    
</>
  )
}

export default Header
