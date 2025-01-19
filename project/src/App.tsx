import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ApplicationForm from './components/ApplicationForm'
import SuccessPage from './pages/SuccessPage'
import RejectionPage from './pages/RejectionPage'
import './styles/ApplicationForm.css'

// Log Supabase URL to verify env loading
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/rejection" element={<RejectionPage />} />
      </Routes>
    </Router>
  )
}

export default App