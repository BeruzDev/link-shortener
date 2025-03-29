import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Sparkles from './components/Particles/Sparkles.jsx'

function App() {
  return(
    <div className='app-container'>
      <Sparkles className="particles-bg"/>

      <Router>
      <Navbar />
      <Routes>
        {/* Rutas de la app */}
        <Route path='/' element = {<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </div>
  )
}
  
export default App
