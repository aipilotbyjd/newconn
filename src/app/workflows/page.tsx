'use client';

import DashboardLayout from '../../components/DashboardLayout';

const WorkflowCard = ({ name, status, lastRun, success, description }: any) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl">⚡</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || statusColors.active}`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Last Run</p>
          <p className="text-sm font-medium text-gray-900">{lastRun}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Success Rate</p>
          <p className="text-sm font-medium text-gray-900">{success}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Runs Today</p>
          <p className="text-sm font-medium text-gray-900">12</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
          Edit
        </button>
        <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
          <span>⋮</span>
        </button>
      </div>
    </div>
  );
};

export default function Workflows() {
  const workflows = [
    {
      name: 'Data Sync Pipeline',
      description: 'Syncs data between CRM and warehouse',
      status: 'active',
      lastRun: '2 min ago',
      success: 98.5
    },
    {
      name: 'Email Notifications',
      description: 'Sends automated email notifications',
      status: 'active',
      lastRun: '15 min ago',
      success: 100
    },
    {
      name: 'Database Backup',
      description: 'Daily backup of production database',
      status: 'paused',
      lastRun: '1 day ago',
      success: 95.2
    },
    {
      name: 'Report Generation',
      description: 'Weekly analytics report generation',
      status: 'active',
      lastRun: '3 hours ago',
      success: 92.1
    },
    {
      name: 'Data Validation',
      description: 'Validates incoming data quality',
      status: 'active',
      lastRun: '30 min ago',
      success: 99.8
    },
    {
      name: 'API Health Check',
      description: 'Monitors external API availability',
      status: 'failed',
      lastRun: '5 min ago',
      success: 87.5
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Workflows</h1>
            <p className="text-gray-600">Manage and monitor your automation workflows</p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-900 transition-colors flex items-center space-x-2">
            <span>➕</span>
            <span>Create Workflow</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Total Workflows</h3>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-green-600 mt-2">+3 this week</p>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Active</h3>
            <p className="text-3xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-500 mt-2">75% of total</p>
          </div>
          <div className="bg-yellow-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Paused</h3>
            <p className="text-3xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-500 mt-2">17% of total</p>
          </div>
          <div className="bg-purple-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Success Rate</h3>
            <p className="text-3xl font-bold text-gray-900">96.4%</p>
            <p className="text-sm text-green-600 mt-2">↑ 2.1%</p>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => (
            <WorkflowCard key={index} {...workflow} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
