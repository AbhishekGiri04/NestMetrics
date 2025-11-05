import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function FeatureCard({ title, description, icon: Icon, link, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link to={link} className="block">
        <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${gradient} shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-sm overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
              {title}
            </h3>
            
            <p className="text-white/80 leading-relaxed group-hover:text-white/70 transition-colors">
              {description}
            </p>
            
            <div className="mt-6 flex items-center text-white/60 group-hover:text-white/80 transition-colors">
              <span className="text-sm font-medium">Explore</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default FeatureCard