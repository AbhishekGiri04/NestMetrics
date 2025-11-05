import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Users, Crown, TrendingUp, DollarSign, MapPin, Star, Zap, Award, X } from 'lucide-react'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000
})

function HostInsights() {
  const [topHosts, setTopHosts] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showHostModal, setShowHostModal] = useState(false)
  const [hostForm, setHostForm] = useState({
    name: '',
    email: '',
    phone: '',
    property_type: '',
    location: ''
  })
  const [formData, setFormData] = useState({
    room_type: 'Entire home/apt',
    neighborhood: 'Manhattan',
    price: 100
  })

  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const roomTypes = ['Entire home/apt', 'Private room', 'Shared room']

  useEffect(() => {
    fetchTopHosts()
  }, [])

  const fetchTopHosts = async () => {
    try {
      const response = await api.get('/api/top-hosts')
      setTopHosts(response.data || [])
    } catch (error) {
      console.error('Error fetching top hosts:', error)
      // Fallback data if API fails
      setTopHosts([
        { host_name: 'Sarah Johnson', listings_count: 12, tier: 'Superhost', avg_price: 185, total_reviews: 245 },
        { host_name: 'Michael Chen', listings_count: 8, tier: 'Plus', avg_price: 165, total_reviews: 189 },
        { host_name: 'Emma Rodriguez', listings_count: 15, tier: 'Superhost', avg_price: 220, total_reviews: 312 },
        { host_name: 'David Kim', listings_count: 6, tier: 'Standard', avg_price: 145, total_reviews: 98 },
        { host_name: 'Lisa Thompson', listings_count: 10, tier: 'Plus', avg_price: 175, total_reviews: 156 }
      ])
    }
  }

  const handleBecomeHost = () => {
    setShowHostModal(true)
  }

  const handleHostSubmit = () => {
    if (!hostForm.name || !hostForm.email) {
      toast.error('Please fill in required fields')
      return
    }
    
    toast.success('Host application submitted successfully! We\'ll contact you soon.')
    setShowHostModal(false)
    setHostForm({ name: '', email: '', phone: '', property_type: '', location: '' })
  }

  const handlePredict = async () => {
    setLoading(true)
    try {
      const response = await api.post('/api/booking-score', {
        price: formData.price,
        neighborhood: formData.neighborhood
      })
      setPrediction(response.data)
    } catch (error) {
      console.error('Error making predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Crown className="w-8 h-8 text-yellow-600 mr-3" />
                Host Insights
              </h1>
              <p className="text-xl text-gray-600">Analyze top-performing hosts and get AI-powered predictions</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBecomeHost}
              className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              <Award className="w-5 h-5 mr-2" />
              Become a Host
            </motion.button>
          </div>
        </motion.div>

        {/* Top Hosts - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-white/20 mb-8"
        >
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Performing Hosts</h2>
              <p className="text-sm text-gray-600">Ranked by total listings and performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topHosts.slice(0, 6).map((host, index) => (
              <motion.div
                key={host.host_name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl border border-yellow-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                    index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                    'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg">{host.host_name}</h3>
                    <p className="text-sm text-gray-600">{host.listings_count} listings</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tier</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      host.tier === 'Superhost' ? 'bg-yellow-200 text-yellow-800' :
                      host.tier === 'Plus' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {host.tier}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Price</span>
                    <span className="font-bold text-green-600 text-lg">${host.avg_price?.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reviews</span>
                    <span className="font-semibold text-gray-900">{host.total_reviews?.toFixed(0)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

          {/* AI Predictor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Price & Review Predictor</h2>
                  <p className="text-sm text-gray-600">Get instant predictions for your listing</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={formData.room_type}
                    onChange={(e) => handleInputChange('room_type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                  <select
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {neighborhoods.map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Price ($)</label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your current price"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Getting AI Predictions...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Get AI Predictions
                    </div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Prediction Results */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 border border-white/20"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                  AI Predictions
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Booking Score</span>
                      <span className="text-2xl font-bold text-green-600">{prediction.booking_score}%</span>
                    </div>
                    <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.booking_score}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Price Competitiveness</span>
                      <span className="text-2xl font-bold text-blue-600">{prediction.price_competitiveness}%</span>
                    </div>
                    <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.price_competitiveness}%` }}
                      ></div>
                    </div>
                  </div>

                  {prediction.insights && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h4>
                      <div className="text-sm text-gray-700">
                        <div className="mb-1">• {prediction.insights.recommendation}</div>
                        <div className="mb-1">• Best booking time: {prediction.insights.best_booking_time}</div>
                        <div>• Urgency level: {prediction.insights.booking_urgency}</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {!prediction && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-white/20 text-center">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for AI Analysis</h3>
                <p className="text-gray-500">Fill in your details and get instant AI-powered predictions</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Become a Host Modal */}
        {showHostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Become a Host</h2>
                <button
                  onClick={() => setShowHostModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={hostForm.name}
                    onChange={(e) => setHostForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={hostForm.email}
                    onChange={(e) => setHostForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={hostForm.phone}
                    onChange={(e) => setHostForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={hostForm.property_type}
                    onChange={(e) => setHostForm(prev => ({ ...prev, property_type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="room">Private Room</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={hostForm.location}
                    onChange={(e) => setHostForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select location</option>
                    {neighborhoods.map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowHostModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleHostSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Submit Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HostInsights