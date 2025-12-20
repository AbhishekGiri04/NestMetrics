import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { API_BASE_URL } from '../config/api'

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})
import toast from 'react-hot-toast'
import { StatCard } from '../components/Cards'
import { PriceChart, ReviewChart } from '../components/Charts'
import FeatureCard from '../components/FeatureCard'
import { DollarSign, Star, TrendingUp, MapPin, Zap, BarChart3 } from 'lucide-react'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, listingsRes] = await Promise.all([
          api.get('/api/stats'),
          api.get('/api/listings?limit=50')
        ])
        setStats(statsRes.data)
        setListings(listingsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        console.error('Dashboard error details:', error.response?.data || error.message)
        toast.error(`Failed to load dashboard data: ${error.response?.status || 'Network Error'}`)
        // Set comprehensive fallback data
        setStats({
          overview: {
            avg_price: 152.72,
            avg_reviews: 1.37,
            total_listings: 48895,
            active_listings: 35000
          },
          market_trends: {
            seasonal_factor: 1.1,
            price_growth: '+12.5%',
            demand_index: 85,
            supply_index: 78
          },
          neighborhoods: {
            'Manhattan': { avg_price: 200, listings: 15000 },
            'Brooklyn': { avg_price: 120, listings: 18000 },
            'Queens': { avg_price: 90, listings: 10000 },
            'Bronx': { avg_price: 75, listings: 4000 },
            'Staten Island': { avg_price: 85, listings: 1895 }
          }
        })
        setListings([
          { id: 1, name: 'Sample Listing', price: 150, neighbourhood_group: 'Manhattan', room_type: 'Entire home/apt' },
          { id: 2, name: 'Demo Property', price: 120, neighbourhood_group: 'Brooklyn', room_type: 'Private room' }
        ])
      }
    }
    fetchData()
  }, [])

  if (!stats) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading NestMetrics Dashboard...</p>
      </div>
    </div>
  )

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >

      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 z-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full translate-x-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full -translate-x-48 translate-y-48 blur-3xl"></div>
      </div>
      
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-900/20 to-transparent"></div>
        <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                NestMetrics – Airbnb Smart Booking Insights
              </h1>
              <div className="mb-8">
                <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 mb-4 font-light tracking-wide">
                  Smart Booking Intelligence
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-200/90 leading-relaxed max-w-4xl mx-auto font-light">
                Discover perfect accommodations with AI-powered insights • Compare deals instantly • 
                Predict booking success • Make confident travel decisions
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/deal-finder"
                className="group relative bg-emerald-500/10 backdrop-blur-md border border-emerald-400/20 hover:bg-emerald-500/20 hover:border-emerald-400/40 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Find Best Deals
                </div>
              </Link>
              <Link
                to="/booking-predictor"
                className="group relative bg-blue-500/10 backdrop-blur-md border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Star className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Booking Success
                </div>
              </Link>
              <Link
                to="/travel-insights"
                className="group relative bg-purple-500/10 backdrop-blur-md border border-purple-400/20 hover:bg-purple-500/20 hover:border-purple-400/40 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Travel Insights
                </div>
              </Link>

            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <motion.div className="bg-emerald-100/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-300/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats ? `$${stats.overview?.avg_price}` : "$152"}</h3>
                <p className="text-gray-700 font-medium">Average Deal Price</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-900">
                Save 25%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Budget Range</span>
              <span className="font-medium text-gray-900">$50-100</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Premium Range</span>
              <span className="font-medium text-gray-900">$200+</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-blue-100/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-300/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">87%</h3>
                <p className="text-gray-700 font-medium">Booking Success</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-900">
                +12%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Instant Book</span>
              <span className="font-medium text-gray-900">45%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Great Reviews</span>
              <span className="font-medium text-gray-900">78%</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-purple-100/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-300/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats ? stats.overview?.total_listings?.toLocaleString() : "48,895"}</h3>
                <p className="text-gray-700 font-medium">Available Properties</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-200 text-purple-900">
                Live
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Entire Homes</span>
              <span className="font-medium text-gray-900">65%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Private Rooms</span>
              <span className="font-medium text-gray-900">32%</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-orange-100/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-300/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
                <p className="text-gray-700 font-medium">NYC Boroughs</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-200 text-orange-900">
                Complete
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Manhattan</span>
              <span className="font-medium text-gray-900">Premium</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Brooklyn</span>
              <span className="font-medium text-gray-900">Trendy</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Analytics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real-time insights and trends to guide your booking decisions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-4 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Price Trends</h3>
              <p className="text-xs text-gray-600">Dynamic pricing analysis across NYC</p>
            </div>
            <div className="h-80 bg-white/80 rounded-xl p-4">
              <PriceChart data={listings} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-4 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Satisfaction Metrics</h3>
              <p className="text-xs text-gray-600">Guest experience predictions</p>
            </div>
            <div className="h-80 bg-white/80 rounded-xl p-4">
              <ReviewChart data={listings} />
            </div>
          </div>
        </div>
      </motion.div>
      
      </div>
      
      {/* AI-Powered Features - Above Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Solutions</h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed font-medium">
              Experience the future of travel planning with our intelligent booking ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-80">
            <FeatureCard
              title="Smart Deal Finder"
              description="Discover unbeatable Airbnb deals with AI-powered price analysis and real-time market comparison."
              icon={DollarSign}
              link="/deal-finder"
              gradient="from-emerald-500 via-green-500 to-teal-600"
              delay={0.1}
            />
            
            <FeatureCard
              title="ML Price Predictor"
              description="Advanced machine learning model trained on thousands of listings for accurate price predictions."
              icon={BarChart3}
              link="/ml-predictor"
              gradient="from-purple-500 via-indigo-500 to-blue-600"
              delay={0.2}
            />
            
            <FeatureCard
              title="Analytics"
              description="Deep insights from comprehensive data analysis including host performance and market trends."
              icon={TrendingUp}
              link="/analytics"
              gradient="from-blue-500 via-cyan-500 to-teal-600"
              delay={0.3}
            />
            
            <FeatureCard
              title="Travel Intelligence"
              description="Access destination insights, optimal booking timing, and personalized travel recommendations."
              icon={Star}
              link="/travel-insights"
              gradient="from-amber-500 via-orange-500 to-red-500"
              delay={0.4}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard