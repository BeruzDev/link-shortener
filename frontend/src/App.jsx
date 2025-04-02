import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useMemo } from 'react'
import { useAppLogic } from './AppLogic.jsx'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Toast from './components/Toast/Toast.jsx'

function App() {
  const { confirmAdvice, message, icon, classIcon, feedToast } = useAppLogic()

  return (
      <div className="app-container">
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas de la app */}
            <Route path="/" element={<Home feedToast={feedToast} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        {confirmAdvice && (
          <Toast
            message={message}
            icon={icon}
            classIcon={classIcon}
            confirmAdvice={confirmAdvice}
          />
        )}
      </div>
  )
}

export default App
