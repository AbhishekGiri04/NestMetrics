import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

import { API_BASE_URL } from '../config/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Users, Home, Award, DollarSign, MapPin } from 'lucide-react'

function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/api/advanced-analytics')
      setAnalytics(response.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advanced analytics...</p>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const roomTypeData = analytics?.price_insights?.avg_price_by_room_type ? 
    Object.entries(analytics.price_insights.avg_price_by_room_type).map(([key, value]) => ({
      name: key,
      price: value
    })) : []

  const neighborhoodData = analytics?.price_insights?.neighborhood_pricing ?
    Object.entries(analytics.price_insights.neighborhood_pricing).map(([key, value]) => ({
      name: key,
      avgPrice: value.mean,
      listings: value.count
    })) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Analytics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep insights from machine learning analysis of Airbnb market data
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics?.price_insights?.price_distribution?.mean?.toFixed(0) || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Median Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics?.price_insights?.price_distribution?.median?.toFixed(0) || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Instant Book Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.booking_patterns?.instant_bookable_ratio?.toFixed(0) || 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Min Nights</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.booking_patterns?.avg_minimum_nights?.toFixed(0) || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Room Type Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Home className="w-6 h-6 text-blue-600 mr-3" />
              Average Price by Room Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Average Price']} />
                <Bar dataKey="price" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Neighborhood Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 text-green-600 mr-3" />
              Neighborhood Pricing
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={neighborhoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Average Price']} />
                <Bar dataKey="avgPrice" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Host Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Users className="w-6 h-6 text-purple-600 mr-3" />
            Host Performance Analysis
          </h3>

          {/* Verified vs Unverified */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${analytics?.host_insights?.verified_vs_unverified?.verified_avg_price?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">Verified Hosts Avg Price</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                ${analytics?.host_insights?.verified_vs_unverified?.unverified_avg_price?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">Unverified Hosts Avg Price</p>
            </div>
          </div>

          {/* Top Hosts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Host Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Listings</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Price</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Total Reviews</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.host_insights?.top_hosts && Object.entries(analytics.host_insights.top_hosts).slice(0, 5).map(([hostName, data]) => (
                  <tr key={hostName} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{hostName}</td>
                    <td className="py-3 px-4 text-center text-blue-600 font-semibold">{data.id}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-semibold">${data['price_$']?.toFixed(0) || 'N/A'}</td>
                    <td className="py-3 px-4 text-center text-purple-600 font-semibold">{data['number of reviews']?.toFixed(0) || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Price Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 text-indigo-600 mr-3" />
            Price Distribution Analysis
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                ${analytics?.price_insights?.price_distribution?.q25?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">25th Percentile</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-2xl font-bold text-green-600 mb-2">
                ${analytics?.price_insights?.price_distribution?.median?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">Median</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                ${analytics?.price_insights?.price_distribution?.q75?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">75th Percentile</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                ${analytics?.price_insights?.price_distribution?.mean?.toFixed(0) || 'N/A'}
              </div>
              <p className="text-gray-700 font-medium">Mean</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics