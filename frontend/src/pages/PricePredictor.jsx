import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000
})
import toast from 'react-hot-toast'
import { Search, TrendingDown, MapPin, Users, DollarSign, Sparkles } from 'lucide-react'

function DealFinder() {
  const [formData, setFormData] = useState({
    room_type: 'Entire home/apt',
    neighborhood: 'Manhattan',
    guests: 2,
    max_budget: 200
  })
  const [deals, setDeals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)

  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const roomTypes = ['Entire home/apt', 'Private room', 'Shared room']

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await api.post('/api/find-deals', formData)
      setDeals(response.data)
      toast.success(`Found ${response.data.deals_found} deals!`)
    } catch (error) {
      toast.error('Failed to find deals')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Deal Finder</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the best Airbnb deals within your budget using AI-powered search and market analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Travel Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Room Type
                </label>
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

              {/* Neighborhood */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Neighborhood
                </label>
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

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Max Budget per Night ($)
                </label>
                <input
                  type="number"
                  min="50"
                  max="1000"
                  value={formData.max_budget}
                  onChange={(e) => handleInputChange('max_budget', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching for Deals...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="w-5 h-5 mr-2" />
                    Find Best Deals
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {deals && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {deals.deals_found}
                  </div>
                  <p className="text-gray-600">Deals Found</p>
                  {deals.price_savings > 0 && (
                    <div className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-block">
                      Save ${deals.price_savings}/night
                    </div>
                  )}
                </div>

                {/* Best Deals List */}
                {deals.best_deals && deals.best_deals.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold text-gray-900">Top Deals</h3>
                    <div className="space-y-2">
                      {deals.best_deals.slice(0, 3).map((deal, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                          <div>
                            <div className="font-medium text-gray-900 truncate max-w-xs">{deal.name}</div>
                            <div className="text-sm text-gray-600">{deal.reviews_per_month || 0} reviews/month</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">${deal.price}</div>
                            <div className="text-xs text-green-700">Value: {Math.round(deal.value_score || 0)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking Tips */}
                {deals.booking_tips && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Smart Tips</h3>
                    <div className="space-y-2">
                      {deals.booking_tips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Market Overview */}
            {stats && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">${stats.overview?.avg_price}</div>
                    <div className="text-sm text-gray-600">Market Average</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{stats.overview?.total_listings?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Listings</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DealFinder