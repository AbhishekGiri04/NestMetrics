import Plot from 'react-plotly.js'

export function PriceChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Pricing Insights</h3>
          <p className="text-gray-600">AI-powered pricing recommendations by location</p>
          <div className="mt-4 flex items-end justify-center space-x-1 h-16">
            <div className="bg-emerald-400 rounded-t w-4 h-8"></div>
            <div className="bg-emerald-500 rounded-t w-4 h-12"></div>
            <div className="bg-emerald-600 rounded-t w-4 h-16"></div>
            <div className="bg-emerald-500 rounded-t w-4 h-10"></div>
            <div className="bg-emerald-400 rounded-t w-4 h-6"></div>
          </div>
        </div>
      </div>
    )
  }

  const neighborhoods = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
  const avgPrices = [180, 140, 120, 95, 110]

  const plotData = [{
    x: neighborhoods,
    y: avgPrices,
    type: 'bar',
    marker: { 
      color: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
      line: { color: '#ffffff', width: 2 }
    }
  }]

  return (
    <Plot
      data={plotData}
      layout={{
        title: '',
        xaxis: { title: 'Neighborhood', showgrid: false, tickangle: -45 },
        yaxis: { title: 'Price ($)', showgrid: true, gridcolor: '#f3f4f6' },
        height: 280,
        margin: { t: 10, b: 80, l: 50, r: 20 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false }}
    />
  )
}

export function ReviewChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Satisfaction Analytics</h3>
          <p className="text-gray-600">Predictive review patterns and satisfaction trends</p>
          <div className="mt-4 flex justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" 
                  strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-blue-600">4.2</span>
                <span className="text-xs text-gray-500">★★★★★</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center space-y-1">
            <div className="text-xs text-gray-500">89% Response Rate</div>
            <div className="text-xs text-gray-500">2.1 Days Avg Response</div>
          </div>
        </div>
      </div>
    )
  }

  const roomTypes = ['Entire home/apt', 'Private room', 'Shared room']
  const avgReviews = [1.8, 1.2, 0.9]

  const plotData = [{
    x: roomTypes,
    y: avgReviews,
    type: 'scatter',
    mode: 'markers',
    marker: { 
      color: ['#3b82f6', '#1d4ed8', '#1e40af'],
      size: 12,
      line: { color: '#ffffff', width: 2 }
    }
  }]

  return (
    <Plot
      data={plotData}
      layout={{
        title: '',
        xaxis: { title: 'Room Type', showgrid: false },
        yaxis: { title: 'Reviews/Month', showgrid: true, gridcolor: '#f3f4f6' },
        height: 280,
        margin: { t: 10, b: 80, l: 60, r: 20 },
        plot_bgcolor: 'transparent',
        paper_bgcolor: 'transparent'
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false }}
    />
  )
}