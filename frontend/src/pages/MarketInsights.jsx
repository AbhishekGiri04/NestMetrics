import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000
})
import toast from 'react-hot-toast'
import { TrendingUp, MapPin, BarChart3, PieChart, Target, Zap } from 'lucide-react'

function TravelInsights() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Manhattan')
  const [budget, setBudget] = useState(200)
  const [insights, setInsights] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

  useEffect(() => {
    fetchStats()
    fetchInsights()
  }, [selectedNeighborhood, budget])

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchInsights = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/api/travel-insights?neighborhood=${selectedNeighborhood}&budget=${budget}`)
      setInsights(response.data)
    } catch (error) {
      console.error('Travel insights error:', error)
      // Set fallback data
      setInsights({
        destination_overview: {
          total_options: 1250,
          within_budget: 890,
          avg_price: selectedNeighborhood === 'Manhattan' ? 200 : selectedNeighborhood === 'Brooklyn' ? 120 : 90,
          budget_savings: Math.max(0, budget - (selectedNeighborhood === 'Manhattan' ? 200 : 120))
        },
        booking_trends: {
          peak_season: 'Summer (Jun-Aug)',
          best_deals: 'Winter (Dec-Feb)',
          booking_window: '2-3 weeks ahead',
          availability: budget > 150 ? 'High' : 'Medium'
        },
        traveler_tips: {
          price_range: selectedNeighborhood === 'Manhattan' ? '$150-300' : '$80-180',
          sweet_spot: selectedNeighborhood === 'Manhattan' ? '$220' : '$110',
          value_picks: [
            {name: `Cozy ${selectedNeighborhood} Apartment`, price: budget * 0.7},
            {name: `Modern ${selectedNeighborhood} Room`, price: budget * 0.8}
          ]
        },
        area_highlights: {
          accommodation_types: {'Entire home/apt': 65, 'Private room': 30, 'Shared room': 5},
          popular_capacity: 2
        },
        fallback: true
      })
    } finally {
      setLoading(false)
    }
  }

  const getCompetitionColor = (level) => {
    const colors = {
      'High': 'text-red-600 bg-red-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Low': 'text-green-600 bg-green-100'
    }
    return colors[level] || 'text-gray-600 bg-gray-100'
  }

  const getGrowthColor = (potential) => {
    const colors = {
      'High': 'text-green-600 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Low': 'text-red-600 bg-red-100'
    }
    return colors[potential] || 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart travel planning with destination analysis and booking recommendations
          </p>
        </motion.div>

        {/* Neighborhood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Travel Preferences</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Destination</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {neighborhoods.map(neighborhood => (
                  <motion.button
                    key={neighborhood}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedNeighborhood(neighborhood)}
                    className={`p-3 rounded-xl font-medium transition-all text-sm ${
                      selectedNeighborhood === neighborhood
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {neighborhood}
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Budget per Night</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="flex-1"
                />
                <div className="text-2xl font-bold text-blue-600">${budget}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Overview */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Market Overview</h3>
              </div>

              {/* Market Trends */}
              {stats.market_trends && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Current Trends</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{stats.market_trends.seasonal_factor}</div>
                      <div className="text-sm text-gray-600">Seasonal Factor</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{stats.market_trends.price_growth}</div>
                      <div className="text-sm text-gray-600">Price Growth</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{stats.market_trends.demand_index}</div>
                      <div className="text-sm text-gray-600">Demand Index</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">{stats.market_trends.supply_index}</div>
                      <div className="text-sm text-gray-600">Supply Index</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Tiers */}
              {stats.performance_tiers && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Market Segments</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Premium Listings</span>
                      <span className="font-bold text-yellow-600">{stats.performance_tiers.premium?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Standard Listings</span>
                      <span className="font-bold text-blue-600">{stats.performance_tiers.standard?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Budget Listings</span>
                      <span className="font-bold text-green-600">{stats.performance_tiers.budget?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Neighborhood Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading market insights...</p>
              </div>
            ) : insights ? (
              <>
                {/* Destination Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Target className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Destination Overview</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {insights.destination_overview.total_options}
                      </div>
                      <div className="text-sm text-gray-600">Total Options</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {insights.destination_overview.within_budget}
                      </div>
                      <div className="text-sm text-gray-600">Within Budget</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        ${insights.destination_overview.avg_price}
                      </div>
                      <div className="text-sm text-gray-600">Average Price</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        ${insights.destination_overview.budget_savings}
                      </div>
                      <div className="text-sm text-gray-600">Potential Savings</div>
                    </div>
                  </div>
                </div>

                {/* Booking Trends */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <PieChart className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Booking Trends</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Peak Season</span>
                        <span className="font-bold text-blue-600">{insights.booking_trends.peak_season}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Best Deals</span>
                        <span className="font-bold text-green-600">{insights.booking_trends.best_deals}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Booking Window</span>
                        <span className="font-bold text-purple-600">{insights.booking_trends.booking_window}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Availability</span>
                        <span className="font-bold text-orange-600">{insights.booking_trends.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Tips */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Zap className="w-6 h-6 text-yellow-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Travel Tips</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Price Range</h4>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-orange-600">
                          {insights.traveler_tips.price_range}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Typical pricing for {selectedNeighborhood}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Sweet Spot</h4>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-green-600">
                          {insights.traveler_tips.sweet_spot}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Best value for money</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
                <p className="text-gray-500">Select a neighborhood to view market insights</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Neighborhood Comparison */}
        {stats?.neighborhoods && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Neighborhood Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Neighborhood</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Price</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Median Price</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Listings</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.neighborhoods).map(([name, data]) => (
                    <tr key={name} className={`border-b border-gray-100 ${name === selectedNeighborhood ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <td className="py-3 px-4 font-medium text-gray-900">{name}</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">${data.avg_price}</td>
                      <td className="py-3 px-4 text-center text-blue-600 font-semibold">${data.median_price}</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-semibold">{data.listings?.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center text-orange-600 font-semibold">{data.avg_reviews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TravelInsights