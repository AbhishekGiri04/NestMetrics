import { motion } from 'framer-motion'
import { Brain, Database, BarChart3, Code, Zap, TrendingUp, Users, Target, Github, Mail, Sparkles, Star, Award, Rocket } from 'lucide-react'

function About() {

  const stats = [
    { label: 'Airbnb Listings', value: '80K+', icon: <Database className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'ML Accuracy (R²)', value: '85%', icon: <Brain className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Visualizations', value: '15+', icon: <BarChart3 className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'NYC Boroughs', value: '5', icon: <TrendingUp className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
  ]

  const techStack = [
    { category: 'Backend', tech: 'Python, Flask, Pandas, Scikit-learn, NumPy', color: 'from-blue-500 to-blue-600' },
    { category: 'Frontend', tech: 'React.js, Tailwind CSS, Plotly.js, Vite', color: 'from-green-500 to-green-600' },
    { category: 'Data & Models', tech: 'CSV files, Pickle models, RESTful APIs', color: 'from-purple-500 to-purple-600' }
  ]

  const workflow = [
    { step: '1', title: 'Data Collection', desc: 'CSV files' },
    { step: '2', title: 'Data Processing', desc: 'Pandas' },
    { step: '3', title: 'Model Training', desc: 'model.pkl' },
    { step: '4', title: 'API Backend', desc: 'Flask' },
    { step: '5', title: 'Frontend', desc: 'React Dashboard' }
  ]

  const features = [
    {
      title: 'Smart Pricing Insights',
      items: ['AI-powered price prediction', 'Dynamic pricing recommendations', 'Competitor analysis'],
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Guest Satisfaction Analytics',
      items: ['Review score prediction using ML', 'Sentiment analysis of feedback', 'Performance benchmarking'],
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Host Performance Dashboard',
      items: ['Real-time analytics and KPIs', 'Occupancy rate tracking', 'Revenue optimization metrics'],
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Market Intelligence',
      items: ['Neighborhood-wise pricing trends', 'Demand forecasting', 'Market opportunity identification'],
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-32"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-blue-100">AI-Powered Intelligence Platform</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
          >
            NestMetrics
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-blue-100 mb-6 font-light"
          >
            Transform Airbnb Decisions with AI
          </motion.p>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-blue-200 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Advanced machine learning, comprehensive market analysis, and intelligent data visualization 
            for smarter accommodation choices.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="/dashboard" className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Platform
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="/deal-finder" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                View Demo
              </span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-20 -mt-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:rotate-1"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 text-center">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className="text-4xl font-black text-gray-900 mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-8"
            >
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-800">Award-Winning Platform</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Project <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Overview</span>
            </h2>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed"
            >
              NestMetrics is a <span className="font-bold text-blue-600">comprehensive full-stack data science application</span> that transforms Airbnb booking decisions 
              through advanced machine learning and intelligent market analysis. Built with a Random Forest Regressor trained on 
              <span className="font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg"> 80,000+ listings</span>, the platform combines predictive analytics, 
              real-time insights, and interactive visualizations to help travelers make smarter accommodation choices.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            ⚙️ Tech Stack
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{stack.category}:</h3>
                <p className="text-gray-600">{stack.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            🔄 Workflow
          </motion.h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="ml-4 mr-8">
                  <div className="font-semibold text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-600">→ {step.desc}</div>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mr-8"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ML Pipeline */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Machine Learning Pipeline
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Data Processing</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 80K+ Airbnb listings with 20+ features</li>
                  <li>• Missing value imputation & outlier removal</li>
                  <li>• Feature engineering & normalization</li>
                  <li>• Statistical validation & quality checks</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. ML Model Training</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Random Forest Regressor algorithm</li>
                  <li>• Features: Room type, location, availability</li>
                  <li>• 80/20 train-test split validation</li>
                  <li>• R² Score: 0.85, MAE: $25</li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Statistical Analysis</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Price distribution by neighborhoods</li>
                  <li>• Correlation analysis & feature importance</li>
                  <li>• Market segmentation & clustering</li>
                  <li>• Seasonal trends & booking patterns</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
                  <div className="text-sm opacity-90 mb-2">📁 model.pkl (675MB)</div>
                  <div className="text-xs space-y-1">
                    <div>• Trained Random Forest Regressor</div>
                    <div>• Price prediction with confidence intervals</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
                  <div className="text-sm opacity-90 mb-2">📄 Processed.csv (18MB)</div>
                  <div className="text-xs space-y-1">
                    <div>• 80K+ cleaned Airbnb listings</div>
                    <div>• 20+ engineered features</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            ✨ Key Features
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            🎯 Business Value
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">For Hosts:</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• <span className="font-semibold">Increase Revenue:</span> 10-15% price optimization</li>
                <li>• <span className="font-semibold">Improve Occupancy:</span> Better market positioning</li>
                <li>• <span className="font-semibold">Save Time:</span> Automated pricing decisions</li>
                <li>• <span className="font-semibold">Competitive Edge:</span> Data-driven insights</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">For Property Managers:</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• <span className="font-semibold">Portfolio Optimization:</span> Multi-property analytics</li>
                <li>• <span className="font-semibold">Performance Tracking:</span> Centralized dashboard</li>
                <li>• <span className="font-semibold">Market Intelligence:</span> Trend analysis</li>
                <li>• <span className="font-semibold">Scalable Operations:</span> Automated recommendations</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold mb-8"
          >
            Project Summary
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            NestMetrics represents the perfect fusion of data science expertise and modern web development. 
            This comprehensive platform transforms raw Airbnb data into actionable insights through advanced machine learning, 
            delivering intelligent booking recommendations through an intuitive, professional interface.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Brain className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">ML-Powered</h3>
              <p className="text-blue-200">Random Forest model with 85% accuracy</p>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Database className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Data-Driven</h3>
              <p className="text-blue-200">80K+ listings with comprehensive analytics</p>
            </motion.div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Zap className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Modern UI</h3>
              <p className="text-blue-200">React + Tailwind with interactive visualizations</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <p className="text-sm text-blue-100 leading-relaxed">
              <span className="font-semibold">Technical Note:</span> This is a complete full-stack data science application 
              showcasing end-to-end ML pipeline integration - from data preprocessing and model training to API development 
              and responsive frontend implementation. The Random Forest model is trained on real NYC Airbnb data and provides 
              accurate price predictions with confidence intervals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Join thousands of users making smarter booking decisions with AI</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.a 
              href="mailto:abhishekgiri1978@gmail.com" 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Mail className="w-6 h-6 mr-3" />
                Contact Developer
              </span>
            </motion.a>
            
            <motion.a 
              href="https://github.com/AbhishekGiri04/NestMetrics" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Github className="w-6 h-6 mr-3" />
                View Source Code
              </span>
            </motion.a>
          </motion.div>
          

        </div>
      </section>
    </div>
  )
}

export default About