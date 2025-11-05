import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000
})
import toast from 'react-hot-toast'
import { Brain, TrendingUp, Target, Zap } from 'lucide-react'

function MLPredictor() {
  const [formData, setFormData] = useState({
    room_type: 'Entire home/apt',
    neighbourhood_group: 'Manhattan',
    minimum_nights: 1,
    availability_365: 365,
    host_listings: 1
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const roomTypes = ['Entire home/apt', 'Private room', 'Shared room']
  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

  const handlePredict = async () => {
    setLoading(true)
    try {
      const response = await api.post('/api/ml-predict', formData)
      setPrediction(response.data)
      toast.success('ML prediction generated!')
    } catch (error) {
      toast.error('Prediction failed')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ML Price Predictor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning model trained on thousands of listings for accurate price predictions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Property Features</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select
                  value={formData.room_type}
                  onChange={(e) => handleInputChange('room_type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                <select
                  value={formData.neighbourhood_group}
                  onChange={(e) => handleInputChange('neighbourhood_group', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Nights</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.minimum_nights}
                  onChange={(e) => handleInputChange('minimum_nights', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability (days/year)</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={formData.availability_365}
                  onChange={(e) => handleInputChange('availability_365', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Host Listings Count</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.host_listings}
                  onChange={(e) => handleInputChange('host_listings', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Running ML Model...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Generate ML Prediction
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
            {prediction && (
              <>
                {/* Main Prediction */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">
                      ${prediction.predicted_price}
                    </div>
                    <p className="text-purple-100 text-lg">ML Predicted Price</p>
                    <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium inline-block">
                      {prediction.model_accuracy}
                    </div>
                  </div>

                  {/* Confidence Interval */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Confidence Range
                    </h3>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${prediction.confidence_interval.lower}</div>
                        <div className="text-purple-200 text-sm">Lower Bound</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">${prediction.confidence_interval.upper}</div>
                        <div className="text-purple-200 text-sm">Upper Bound</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Model Info */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                    Model Insights
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Similar Listings</span>
                        <span className="text-lg font-bold text-blue-600">
                          {prediction.similar_listings_count}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Prediction Accuracy</span>
                        <span className="text-lg font-bold text-green-600">85%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Model Type</span>
                        <span className="text-lg font-bold text-purple-600">Random Forest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!prediction && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 text-center">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for Prediction</h3>
                <p className="text-gray-500">Fill in the property details and click predict to get ML-powered price estimation</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MLPredictor