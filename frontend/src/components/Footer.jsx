import { Link } from 'react-router-dom'
import { DollarSign, BarChart3, TrendingUp, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 border-t border-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://img.freepik.com/premium-vector/hotel-logo-design_423075-16.jpg" 
                alt="NestMetrics Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">NestMetrics</h3>
            </div>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              AI-powered Airbnb booking intelligence platform that transforms complex market data into actionable insights. Make smarter accommodation decisions with ML-driven price predictions, deal discovery, and comprehensive market analytics.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-11 h-11 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gray-500/30">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-11 h-11 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link to="/deal-finder" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><DollarSign className="w-4 h-4 mr-2" />Revenue Optimization</Link></li>
              <li><Link to="/analytics" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><BarChart3 className="w-4 h-4 mr-2" />Performance Analytics</Link></li>
              <li><Link to="/hosts" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><TrendingUp className="w-4 h-4 mr-2" />Business Intelligence</Link></li>
              <li><Link to="/travel-insights" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><MapPin className="w-4 h-4 mr-2" />Market Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link to="/help" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>User Guide</Link></li>
              <li><a href="https://nestmetrics-dev.onrender.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>Developer API</a></li>
              <li><a href="mailto:abhishekgiri1978@gmail.com" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Business Support</a></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-all duration-200 hover:translate-x-1 flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>Knowledge Base</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">
            © 2025 NestMetrics – Airbnb Smart Booking Insights. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 font-medium">Privacy Policy</Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer