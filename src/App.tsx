
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AssetPage from "./pages/AssetPage"

import SimulationPage from "./pages/SimulationPage"
import UserProfilePage from "./pages/UserProfilePage"

function App() {

  return (
    <div className="min-h-screen bg-base-200">
      <div role="alert" className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Warning: This is just a demo of the real Wealth Sim. There are no apis or databases connected to this website. Please download and run both repositories locally if you want to see the live simulator.</span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AssetPage/>} />
          <Route path="/asset" element={ <AssetPage/>}/>
          <Route path="/profile" element={<UserProfilePage/>}/>
          <Route path="/simulation" element={<SimulationPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
