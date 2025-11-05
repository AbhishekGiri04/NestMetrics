import { motion } from 'framer-motion'
import { HelpCircle, BookOpen, MessageCircle, Mail, ChevronDown, ChevronUp, Zap, Shield, BarChart3, Download, Clock, Send } from 'lucide-react'
import { useState } from 'react'

function Help() {
  const [openFaq, setOpenFaq] = useState(null)

  const supportCards = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using NestMetrics to optimize your Airbnb listings.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      link: '/'
    },
    {
      title: 'FAQ',
      description: 'Find answers to commonly asked questions about our platform.',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      link: '#faq'
    },
    {
      title: 'Contact Support',
      description: 'Get personalized help from our support team.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      link: '#contact'
    }
  ]

  const faqs = [
    {
      question: 'How does the price prediction work?',
      answer: 'Our AI analyzes historical data, market trends, seasonality, and neighborhood factors to recommend optimal pricing for your listings.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      question: 'What data do I need to get started?',
      answer: 'Simply provide your property details like location, room type, and amenities. Our system will handle the rest automatically.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: 'How accurate are the predictions?',
      answer: 'Our machine learning models achieve 85%+ accuracy by analyzing thousands of data points and market conditions.',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      question: 'Can I export my analytics data?',
      answer: 'Yes! You can export all your analytics, reports, and insights in CSV or JSON format for offline analysis.',
      icon: <Download className="w-5 h-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <Clock className="w-5 h-5 text-green-300 mr-2" />
              <span className="text-sm font-medium text-green-100">24/7 Support Available</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
          >
            Help & Support
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Get the most out of NestMetrics with our comprehensive guides and support resources
          </motion.p>
        </div>
      </motion.section>

      {/* Support Cards */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-20 -mt-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {supportCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:rotate-1"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 text-center h-full">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{card.description}</p>
                  <motion.a
                    href={card.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-3 bg-gradient-to-r ${card.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-center`}
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 text-white">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Need More <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Help?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team is here to help you succeed with your Airbnb business.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.a
              href="mailto:abhishekgiri1978@gmail.com"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Email Support</h3>
                <p className="text-blue-100">Get detailed help via email</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Send className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Live Chat</h3>
                <p className="text-purple-100">Chat with us in real-time</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Help