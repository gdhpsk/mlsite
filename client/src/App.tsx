import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router-dom'
import './style.css'

import Header from './components/Header'
import List from './views/List'
import Leaderboard from './views/Leaderboard'
import SubmitRecord from './views/SubmitRecord'
import About from './views/About'
import FAQ from './views/FAQ'
import Roulette from './views/Roulette'
import Changelog from './views/Changelog'
import AllMobileExtremes from './views/AllMobileExtremes'
import Packs from './views/Packs'
import Login from './components/Login'
import Legacy from './views/Legacy'

const App: React.FC = () => {
  return (
    <>
    <Login></Login>
      <div className="fixed -z-50 h-screen w-full to-blue-800" style={{backgroundImage: "url('/left_background.svg'), url('/right_background.svg')", backgroundPosition: "left center, right center", backgroundRepeat: "no-repeat, no-repeat"}}/>
      <HashRouter>
        <Header
          name="GD Mobile List"
          main={{
            about: '/about',
            levels: '/',
            legacy: "/legacy",
            leaderboard: '/leaderboard',
            submit: "/submit"
          }}
          additional={{
            faq: "/faq",
            roulette: "/roulette",
            changelog: "/changelog",
            ame: "/ame",
            // packs: "/packs"
          }}
        />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<List />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/submit" element={<SubmitRecord />} />
          <Route path="/ame" element={<AllMobileExtremes />} />
          <Route path="/packs" element={<Packs />} />
          <Route path="/legacy" element={<Legacy />} />
        </Routes>
      </HashRouter>
    </>
  )
}

const root = createRoot(document.getElementById('root') as HTMLDivElement)
root.render(<App />)
