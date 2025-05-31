'use client';
import React, { useEffect, useRef, useState, } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '../primitives/navigation-menu'
import * as Dialog from '@radix-ui/react-dialog';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import Settings from './Settings';

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
  
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);
  const { name, main, additional } = props
  // const [mainTabs, additionalTabs] = [['About', 'Levels', 'Legacy', 'Leaderboard', 'Submit Record'], ['FAQ', 'Roulette', 'Changelog', "AME", "Packs"]]
  let location = useLocation()
  const [mainTabs, additionalTabs] = [['About', 'Main List', 'HRR List', 'Legacy', 'Leaderboard', 'Submit Record'], ['FAQ', 'Roulette', 'Changelog', "Not List Worthy"]]
  let [show, setShow] = useState<boolean>(false)
  let [showPC, setShowPC] = useState(false)
  const navigate = useNavigate()
  let [scrollable, setScrollable] = useState("")
  let element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if(window.innerWidth >= 1500) return;
    setTimeout(() => {
      if(!scrollable) {
        setScrollable(document.body.style.overflow)
      }
    }, 500)
  }, [document.body.style.overflow])

  useEffect(() => {
    window.onclick = (e) => {
      if((e.target as any)?.id == "menu") return;
      setShowPC(false)
    }
  }, [])

  useEffect(() => {
    if(window.innerWidth >= 1500) {
      document.body.style.overflowX = "hidden"
      return;
    };
    if(show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = scrollable
    }
  }, [show])

  useEffect(() => {
    element.current.focus()
  }, [element.current])

  return (
    <div className='bg-[#11806a]'>
    <div className="flex select-none flex-row items-center justify-between pr-12 opacity-100 border-[#0b5042] border-b-2 bg-[#11806a]" ref={element}  style={{background: "linear-gradient(80deg, #37a666 250px, transparent 0%)"}}>
      <div    style={{height: element.current ? `${element.current.clientHeight}px` : "70px", width: "255px", clipPath: "polygon(0% 0%, 242px 0%, 100% 100%, 0% 100%)"}} className="cursor-pointer p-4 text-3xl font-bold text-white hover:bg-[#2e8855]" onClick={() => navigate('/')}>
        {name}
      </div>
      {window.innerWidth > 992 ? (
        <NavigationMenu>
          <NavigationMenuList>
            {Object.keys(main).map((r, i) => (
              <NavigationMenuItem key={`nav-${i}`}>
                <div
                  className={`cursor-pointer p-4 text-white hover:bg-[#0b5042] duration-100 border-t-transparent border-b-white ${location.pathname == main[r] ? "border-b-4 border-t-4" : ""}`}
                  style={{height: element.current ? `${element.current.clientHeight}px` : "70px", alignContent: "center"}}
                  onClick={() => {
                    navigate(main[r])
                  }}
                >
                  {mainTabs[i]}
                </div>
              </NavigationMenuItem>
            ))}
            <div className="grid place-items-center p-3 hover:bg-[#0b5042] duration-100" style={{height: element.current ? `${element.current.clientHeight}px` : "auto"}} onMouseOver={() => setShowPC(true)} onMouseLeave={() => setShowPC(false)} id="menu" onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            setShowPC(!showPC)
          }}>
              <HiMenu size={30} color="white"/>
              {showPC ? <div className={`absolute bg-[#11806a] z-50 border-[#0b5042] border-l-2 border-r-2 border-b-2`} style={{width: "200px", top: element.current ? `${element.current.clientHeight}px` : "auto", right: "0px"}}>
                {Object.keys(additional).map((r, i) => ( 
              <>
              <p
                  key={`link-${i}`}
                  onClick={() => {
                    navigate(additional[r])
                    setShowPC(false)
                  }}
                  className={`text-white p-5 text-base border-double hover:bg-[#0b5042] duration-100 ${location.pathname == main[r] ? "border-b-white border-b-4" : ""}`}
                >
                  {additionalTabs[i]}
                </p>
              </>
            ))}{currentUser ? <p
            onClick={() => document.getElementById("settings-form-button").click()}
            className={`text-white p-5 text-base border-double hover:bg-[#0b5042] duration-100`}
          >Settings</p> : <p
          onClick={() => document.getElementById("login-form-button").click()}
          className={`text-white p-5 text-base border-double hover:bg-[#0b5042] duration-100`}
        >Login</p>}</div> : ""}
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
              <HiMenu size={30} color="white"/>
            </label>
            <div className={`absolute ${!show ? "hidden" : "block"} bg-[#11806a] z-50 overflow-y-scroll border-[#0b5042] border-l-2 border-r-2 border-b-2`} style={{width: "min(300px, 100%)", height: "calc(100% - 60px)", marginTop: "20px", marginLeft: "-222px"}}>
              <br></br>
              <h1 className="text-white text-center text-2xl font-bold">• Main Info •</h1>
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
              <h1 className="text-white text-center text-2xl font-bold">• Additional Info •</h1>
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
              {currentUser ? (
                <p
                  className="text-white p-4 text-xl border-double"
                  onClick={() => document.getElementById("settings-form-button").click()}
                >
                  Settings
                </p>
              ) : (
                <p
                  className="text-white p-4 text-xl border-double"
                  onClick={() => document.getElementById("login-form-button").click()}
                >
                  Login
                  </p>
              )}
                  <br></br>
            </div>  
          </div>
        </div>
      )}
    </div>
    
</div>
  )
}

export default Header
