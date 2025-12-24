import AssetPage from "./pages/AssetPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AssetPage/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
