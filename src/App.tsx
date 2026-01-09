
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AssetPage from "./pages/AssetPage"

import SimulationPage from "./pages/SimulationPage"
import UserProfilePage from "./pages/UserProfilePage"

function App() {

  return (
    <div className="min-h-screen bg-base-200">
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
