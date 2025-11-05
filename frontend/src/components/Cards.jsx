export function StatCard({ title, value, icon, color = 'blue', trend, stats = [] }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-6 border border-gray-100 cursor-pointer relative">
      <div className={`absolute -top-3 right-4 bg-gradient-to-r ${colorClasses[color]} rounded-lg p-2 shadow-lg`}>
        <div className="text-white">{icon}</div>
      </div>
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
          {trend && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {trend}
            </span>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
        {stats.length > 0 && (
          <div className="space-y-1">
            {stats.map((stat, index) => (
              <div key={index} className="text-xs text-gray-500 flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${colorClasses[color]} opacity-60`}></div>
                {stat}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}