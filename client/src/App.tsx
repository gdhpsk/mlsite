import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router-dom'
import './style.css'

import Header from './components/Header'
import List from './views/List'
import HRRList from "./views/HRRList"
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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Settings from './components/Settings'
import { getAuth, sendEmailVerification } from 'firebase/auth'

const App: React.FC = () => {
const firebaseConfig = {
  apiKey: "AIzaSyBaUVIwLoKSSZwif1i1-Ftp0EmicRJ2Yc4",
  authDomain: "mobile-list-24da7.firebaseapp.com",
  projectId: "mobile-list-24da7",
  storageBucket: "mobile-list-24da7.firebasestorage.app",
  messagingSenderId: "841656108584",
  appId: "1:841656108584:web:0a2bbf5663f3017317171d",
  measurementId: "G-X4G2G695NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics.app.automaticDataCollectionEnabled = false;
const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
useEffect(() => {
  const auth = getAuth();
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .catch((error: Error) => {
          console.error("Error sending verification email:", error);
        });
    }
  });

  return () => unsubscribe();
}, []);
  return (
    <>
      {currentUser ? <Settings /> : <Login />}
      <div className="fixed -z-50 h-screen w-full to-blue-800" style={{backgroundImage: "url('/left_background.svg'), url('/right_background.svg')", backgroundPosition: "left center, right center", backgroundRepeat: "no-repeat, no-repeat"}}/>
      <HashRouter>
        <Header
          name="GD Mobile List"
          main={{
            about: '/about',
            levels: '/',
            hrrlevels: "/hrr",
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
          <Route path="/hrr" element={<HRRList />} />
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
