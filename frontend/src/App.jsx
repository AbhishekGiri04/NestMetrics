import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingPage from './pages/LoadingPage'
import Dashboard from './pages/Dashboard'
import Listings from './pages/Listings'
import HostInsights from './pages/HostInsights'
import Help from './pages/Help'
import About from './pages/About'
import DealFinder from './pages/PricePredictor'
import BookingPredictor from './pages/ReviewPredictor'
import TravelInsights from './pages/MarketInsights'
import MLPredictor from './pages/MLPredictor'
import Analytics from './pages/Analytics'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [redirectToDashboard, setRedirectToDashboard] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
      setRedirectToDashboard(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (showLoading) {
    return <LoadingPage />
  }

  if (redirectToDashboard) {
    // Force redirect to dashboard after loading
    window.history.replaceState(null, '', '/dashboard')
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/listings" element={<Listings />} />
                  <Route path="/hosts" element={<HostInsights />} />
                  <Route path="/deal-finder" element={<DealFinder />} />
                  <Route path="/booking-predictor" element={<BookingPredictor />} />
                  <Route path="/travel-insights" element={<TravelInsights />} />
                  <Route path="/ml-predictor" element={<MLPredictor />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        } />

      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px'
          }
        }}
      />
    </Router>
  )
}

export default App