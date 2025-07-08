'use client';

import DashboardLayout from '../../components/DashboardLayout';

const MetricCard = ({ title, value, change, trend, icon, color }: any) => {
  return (
    <div className={`${color} rounded-3xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-700' : 'text-red-700'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Monitor your workflow performance and system metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-900 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Executions"
            value="1,234"
            change="12.5%"
            trend="up"
            icon="🚀"
            color="bg-blue-50"
          />
          <MetricCard 
            title="Success Rate"
            value="96.4%"
            change="2.1%"
            trend="up"
            icon="✅"
            color="bg-green-50"
          />
          <MetricCard 
            title="Avg Duration"
            value="2m 34s"
            change="8.3%"
            trend="down"
            icon="⏱️"
            color="bg-purple-50"
          />
          <MetricCard 
            title="API Calls"
            value="45.2K"
            change="18.9%"
            trend="up"
            icon="🔌"
            color="bg-orange-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Execution Trends */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Execution Trends</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
              <p className="text-gray-400">Line Chart Placeholder</p>
            </div>
          </div>

          {/* Workflow Performance */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Workflow Performance</h3>
            <div className="space-y-4">
              {[
                { name: 'Data Sync Pipeline', success: 98.5, runs: 234 },
                { name: 'Email Notifications', success: 100, runs: 567 },
                { name: 'Database Backup', success: 95.2, runs: 89 },
                { name: 'Report Generation', success: 92.1, runs: 123 }
              ].map((workflow, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{workflow.name}</span>
                      <span className="text-sm text-gray-500">{workflow.success}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${workflow.success}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm text-gray-500">{workflow.runs} runs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * 0.85} ${2 * Math.PI * 56 * 0.15}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mt-4">CPU Usage</h4>
              <p className="text-sm text-gray-500">Healthy</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="12" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * 0.65} ${2 * Math.PI * 56 * 0.35}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">65%</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mt-4">Memory Usage</h4>
              <p className="text-sm text-gray-500">Normal</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#f59e0b" strokeWidth="12" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * 0.42} ${2 * Math.PI * 56 * 0.58}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">42%</span>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mt-4">Disk Usage</h4>
              <p className="text-sm text-gray-500">Good</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
