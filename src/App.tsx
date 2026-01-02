import AssetPage from "./pages/AssetPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SimulationPage from "./pages/SimulationPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssetPage/>} />
        <Route path="/asset" element={ <AssetPage/>}/>
        <Route path="/simulation" element={<SimulationPage/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
