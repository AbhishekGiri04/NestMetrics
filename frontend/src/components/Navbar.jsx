import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()
  
  const navItems = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/analytics', name: 'Analytics' },
    { path: '/listings', name: 'Listings' },
    { path: '/hosts', name: 'Hosts' },
    { path: '/ml-predictor', name: 'ML Predict' },
    { path: '/help', name: 'Support' },
    { path: '/about', name: 'About' }
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-2xl border-b border-indigo-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <img 
                src="https://img.freepik.com/premium-vector/hotel-logo-design_423075-16.jpg" 
                alt="NestMetrics Logo" 
                className="w-12 h-12 rounded-2xl object-cover shadow-xl"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  NestMetrics
                </h1>
                <p className="text-xs text-black font-medium">Smart Booking Intelligence</p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar