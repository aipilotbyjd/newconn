'use client';

import { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allCredentials = [
    {
      id: 1,
      name: 'Slack API',
      type: 'OAuth Token',
      service: 'Slack',
      status: 'active',
      lastUsed: '2 hours ago',
      icon: '💬'
    },
    {
      id: 2,
      name: 'Database Connection',
      type: 'Connection String',
      service: 'PostgreSQL',
      status: 'active',
      lastUsed: '15 minutes ago',
      icon: '🗄️'
    },
    {
      id: 3,
      name: 'Email Service',
      type: 'API Key',
      service: 'SendGrid',
      status: 'expired',
      lastUsed: '5 days ago',
      icon: '📧'
    },
    {
      id: 4,
      name: 'AWS S3',
      type: 'Access Key',
      service: 'Amazon S3',
      status: 'active',
      lastUsed: '1 day ago',
      icon: '☁️'
    },
    {
      id: 5,
      name: 'GitHub Integration',
      type: 'Personal Access Token',
      service: 'GitHub',
      status: 'inactive',
      lastUsed: '1 week ago',
      icon: '🐙'
    },
    {
      id: 6,
      name: 'Webhook Endpoint',
      type: 'Bearer Token',
      service: 'Custom API',
      status: 'active',
      lastUsed: '3 hours ago',
      icon: '🔗'
    },
    {
      id: 7,
      name: 'Stripe Payment',
      type: 'API Key',
      service: 'Stripe',
      status: 'active',
      lastUsed: '5 hours ago',
      icon: '💳'
    },
    {
      id: 8,
      name: 'Twilio SMS',
      type: 'OAuth Token',
      service: 'Twilio',
      status: 'expired',
      lastUsed: '2 weeks ago',
      icon: '📱'
    }
  ];

  // Filter credentials
  let filteredCredentials = allCredentials.filter(credential => 
    credential.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credential.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply type filter
  if (typeFilter !== 'all') {
    filteredCredentials = filteredCredentials.filter(credential => credential.type === typeFilter);
  }

  // Apply status filter
  if (statusFilter !== 'all') {
    filteredCredentials = filteredCredentials.filter(credential => credential.status === statusFilter);
  }

  // Sort credentials
  const sortedCredentials = [...filteredCredentials].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'service':
        return a.service.localeCompare(b.service);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCredentials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCredentials = sortedCredentials.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: any) => (value: any) => {
    setter(value);
    setCurrentPage(1);
  };

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
            <p className="text-3xl font-bold text-gray-900">{allCredentials.length}</p>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Active</h3>
            <p className="text-3xl font-bold text-gray-900">
              {allCredentials.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Expired</h3>
            <p className="text-3xl font-bold text-gray-900">
              {allCredentials.filter(c => c.status === 'expired').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Inactive</h3>
            <p className="text-3xl font-bold text-gray-900">
              {allCredentials.filter(c => c.status === 'inactive').length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => handleFilterChange(setTypeFilter)(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="OAuth Token">OAuth Token</option>
            <option value="API Key">API Key</option>
            <option value="Connection String">Connection String</option>
            <option value="Access Key">Access Key</option>
            <option value="Personal Access Token">Personal Access Token</option>
            <option value="Bearer Token">Bearer Token</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => handleFilterChange(setSortBy)(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="service">Sort by Service</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCredentials.map((credential) => (
            <CredentialCard key={credential.id} {...credential} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedCredentials.length)} of {sortedCredentials.length} credentials
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Add New CTA */}
        {filteredCredentials.length === 0 && (
          <div className="mt-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">No Credentials Found</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search query'
                : 'Get started by adding your first credential'}
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors">
              Add Credential
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
