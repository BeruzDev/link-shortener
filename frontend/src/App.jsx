import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppLogic } from './AppLogic.jsx'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Toast from './components/Toast/Toast.jsx'
import LogModal from './components/LogModal/LogModal.jsx'

function App() {
  const { confirmAdvice, message, icon, classIcon, feedToast } = useAppLogic()

  return (
      <div className="app-container">
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas de la app */}
            <Route path="/" element={<Home feedToast={feedToast} />} />
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
        <LogModal />
        <footer id="footer">
        <p>BeruzDev</p>
      </footer>
      </div>
  )
}

export default App
