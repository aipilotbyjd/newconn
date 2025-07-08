'use client';

import DashboardLayout from '../../components/DashboardLayout';

const CredentialCard = ({ name, type, service, status, lastUsed, icon }: any) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  const typeColors = {
    'OAuth Token': 'bg-purple-100 text-purple-800',
    'API Key': 'bg-blue-100 text-blue-800',
    'Connection String': 'bg-green-100 text-green-800',
    'Access Key': 'bg-orange-100 text-orange-800',
    'Personal Access Token': 'bg-indigo-100 text-indigo-800',
    'Bearer Token': 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-xl">{icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{service}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || statusColors.active}`}>
          {status}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Type</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type] || 'bg-gray-100 text-gray-800'}`}>
            {type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Last Used</span>
          <span className="text-sm text-gray-900">{lastUsed}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
          Edit
        </button>
        <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">
          Test
        </button>
        <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
          <span>🗑️</span>
        </button>
      </div>
    </div>
  );
};

export default function Credentials() {
  const credentials = [
    {
      name: 'Slack API',
      type: 'OAuth Token',
      service: 'Slack',
      status: 'active',
      lastUsed: '2 hours ago',
      icon: '💬'
    },
    {
      name: 'Database Connection',
      type: 'Connection String',
      service: 'PostgreSQL',
      status: 'active',
      lastUsed: '15 minutes ago',
      icon: '🗄️'
    },
    {
      name: 'Email Service',
      type: 'API Key',
      service: 'SendGrid',
      status: 'expired',
      lastUsed: '5 days ago',
      icon: '📧'
    },
    {
      name: 'AWS S3',
      type: 'Access Key',
      service: 'Amazon S3',
      status: 'active',
      lastUsed: '1 day ago',
      icon: '☁️'
    },
    {
      name: 'GitHub Integration',
      type: 'Personal Access Token',
      service: 'GitHub',
      status: 'inactive',
      lastUsed: '1 week ago',
      icon: '🐙'
    },
    {
      name: 'Webhook Endpoint',
      type: 'Bearer Token',
      service: 'Custom API',
      status: 'active',
      lastUsed: '3 hours ago',
      icon: '🔗'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Credentials</h1>
            <p className="text-gray-600">Manage your API keys and authentication tokens</p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-900 transition-colors flex items-center space-x-2">
            <span>🔐</span>
            <span>Add Credential</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-purple-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Total Credentials</h3>
            <p className="text-3xl font-bold text-gray-900">{credentials.length}</p>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Active</h3>
            <p className="text-3xl font-bold text-gray-900">
              {credentials.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Expired</h3>
            <p className="text-3xl font-bold text-gray-900">
              {credentials.filter(c => c.status === 'expired').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Inactive</h3>
            <p className="text-3xl font-bold text-gray-900">
              {credentials.filter(c => c.status === 'inactive').length}
            </p>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((credential, index) => (
            <CredentialCard key={index} {...credential} />
          ))}
        </div>

        {/* Add New CTA */}
        <div className="mt-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Add New Credential</h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Securely store API keys, tokens, and connection strings for your workflows
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors">
            Add Credential
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
