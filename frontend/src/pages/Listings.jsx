import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Search, Filter, Plus, Eye, Edit, MapPin, Home, Users, Star, X } from 'lucide-react'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000
})

function Listings() {
  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editListing, setEditListing] = useState({})
  const [filters, setFilters] = useState({
    neighborhood: '',
    room_type: '',
    search: ''
  })
  const [newListing, setNewListing] = useState({
    name: '',
    host_name: '',
    neighbourhood_group: '',
    room_type: '',
    price: '',
    minimum_nights: 1,
    availability_365: 365
  })

  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const roomTypes = ['Entire home/apt', 'Private room', 'Shared room', 'Hotel room']

  useEffect(() => {
    fetchListings()
  }, [])

  useEffect(() => {
    // Save to localStorage whenever listings change
    localStorage.setItem('nestmetrics_listings', JSON.stringify(listings))
  }, [listings])

  useEffect(() => {
    applyFilters()
  }, [filters, listings])

  const fetchListings = async () => {
    try {
      // Always fetch from API first
      const response = await api.get('/api/listings?limit=100')
      setListings(response.data)
      setFilteredListings(response.data)
      
      // Check localStorage for any additional listings
      const savedListings = localStorage.getItem('nestmetrics_listings')
      if (savedListings) {
        const parsedListings = JSON.parse(savedListings)
        // Merge API data with localStorage data
        const mergedListings = [...response.data, ...parsedListings.filter(saved => 
          !response.data.some(api => api.id === saved.id)
        )]
        setListings(mergedListings)
        setFilteredListings(mergedListings)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
      // Try localStorage as fallback
      const savedListings = localStorage.getItem('nestmetrics_listings')
      if (savedListings) {
        const parsedListings = JSON.parse(savedListings)
        setListings(parsedListings)
        setFilteredListings(parsedListings)
      }
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = listings
    
    if (filters.neighborhood) {
      filtered = filtered.filter(listing => 
        listing['neighbourhood group'] === filters.neighborhood
      )
    }
    
    if (filters.room_type) {
      filtered = filtered.filter(listing => 
        listing['room type'] === filters.room_type
      )
    }
    
    if (filters.search) {
      filtered = filtered.filter(listing => 
        listing.NAME?.toLowerCase().includes(filters.search.toLowerCase()) ||
        listing['host name']?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredListings(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleAddListing = () => {
    setShowAddModal(true)
  }

  const handleSaveListing = () => {
    const listingData = {
      ...newListing,
      id: Date.now(),
      'NAME': newListing.name,
      'host name': newListing.host_name,
      'neighbourhood group': newListing.neighbourhood_group,
      'room type': newListing.room_type,
      'price_$': parseFloat(newListing.price),
      'minimum nights': newListing.minimum_nights,
      'availability 365': newListing.availability_365,
      'number of reviews': 0
    }
    
    setListings(prev => [listingData, ...prev])
    setShowAddModal(false)
    setNewListing({
      name: '',
      host_name: '',
      neighbourhood_group: '',
      room_type: '',
      price: '',
      minimum_nights: 1,
      availability_365: 365
    })
    toast.success('Listing added successfully!')
  }

  const handleViewListing = (listing) => {
    setSelectedListing(listing)
    setShowViewModal(true)
  }

  const handleEditListing = (listing) => {
    setEditListing({
      ...listing,
      name: listing.NAME || '',
      host_name: listing['host name'] || '',
      neighbourhood_group: listing['neighbourhood group'] || '',
      room_type: listing['room type'] || '',
      price: listing['price_$'] || '',
      minimum_nights: listing['minimum nights'] || 1,
      availability_365: listing['availability 365'] || 365
    })
    setShowEditModal(true)
  }

  const handleUpdateListing = () => {
    const updatedListings = listings.map(listing => 
      listing.id === editListing.id ? {
        ...listing,
        'NAME': editListing.name,
        'host name': editListing.host_name,
        'neighbourhood group': editListing.neighbourhood_group,
        'room type': editListing.room_type,
        'price_$': parseFloat(editListing.price),
        'minimum nights': editListing.minimum_nights,
        'availability 365': editListing.availability_365
      } : listing
    )
    
    setListings(updatedListings)
    setShowEditModal(false)
    setEditListing({})
    toast.success('Listing updated successfully!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading listings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
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
                <Home className="w-8 h-8 text-blue-600 mr-3" />
                Airbnb Listings
              </h1>
              <p className="text-xl text-gray-600">Explore and analyze property listings with advanced filters</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddListing}
              className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Listing
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-white/20"
        >
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Listings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={filters.neighborhood}
              onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))}
            </select>
            
            <select
              value={filters.room_type}
              onChange={(e) => handleFilterChange('room_type', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Room Types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-600">Results:</span>
              <span className="font-semibold text-blue-600">{filteredListings.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Listings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Host</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reviews</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredListings.slice(0, 50).map((listing, index) => (
                  <motion.tr
                    key={listing.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 truncate max-w-xs">
                          {listing.NAME || `Property ${listing.id}`}
                        </div>
                        <div className="text-sm text-gray-500">ID: {listing.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{listing['host name'] || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{listing['neighbourhood group'] || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {listing['room type'] || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-lg font-bold text-green-600">${listing['price_$'] || 'N/A'}</div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-900">{listing['number of reviews'] || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleViewListing(listing)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditListing(listing)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No listings found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          )}
        </motion.div>

        {/* Add New Listing Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Listing</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                  <input
                    type="text"
                    value={newListing.name}
                    onChange={(e) => setNewListing(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter property name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Host Name</label>
                  <input
                    type="text"
                    value={newListing.host_name}
                    onChange={(e) => setNewListing(prev => ({ ...prev, host_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter host name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                  <select
                    value={newListing.neighbourhood_group}
                    onChange={(e) => setNewListing(prev => ({ ...prev, neighbourhood_group: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select neighborhood</option>
                    {neighborhoods.map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={newListing.room_type}
                    onChange={(e) => setNewListing(prev => ({ ...prev, room_type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($)</label>
                  <input
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Nights</label>
                  <input
                    type="number"
                    value={newListing.minimum_nights}
                    onChange={(e) => setNewListing(prev => ({ ...prev, minimum_nights: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveListing}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Save Listing
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* View Listing Modal */}
        {showViewModal && selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Listing Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Property Name</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing.NAME || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Host</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['host name'] || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Neighborhood</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['neighbourhood group'] || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Room Type</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['room type'] || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Price per Night</label>
                    <p className="text-2xl font-bold text-green-600">${selectedListing['price_$'] || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Reviews</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['number of reviews'] || 0}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Minimum Nights</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['minimum nights'] || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Availability</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedListing['availability 365'] || 'N/A'} days/year</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Listing Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Listing</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                  <input
                    type="text"
                    value={editListing.name}
                    onChange={(e) => setEditListing(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Host Name</label>
                  <input
                    type="text"
                    value={editListing.host_name}
                    onChange={(e) => setEditListing(prev => ({ ...prev, host_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                  <select
                    value={editListing.neighbourhood_group}
                    onChange={(e) => setEditListing(prev => ({ ...prev, neighbourhood_group: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {neighborhoods.map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={editListing.room_type}
                    onChange={(e) => setEditListing(prev => ({ ...prev, room_type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($)</label>
                  <input
                    type="number"
                    value={editListing.price}
                    onChange={(e) => setEditListing(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Nights</label>
                  <input
                    type="number"
                    value={editListing.minimum_nights}
                    onChange={(e) => setEditListing(prev => ({ ...prev, minimum_nights: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateListing}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Update Listing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings