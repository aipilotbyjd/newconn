'use client';

import { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allWorkflows = [
    {
      id: 1,
      name: 'Data Sync Pipeline',
      description: 'Syncs data between CRM and warehouse',
      status: 'active',
      lastRun: '2 min ago',
      success: 98.5
    },
    {
      id: 2,
      name: 'Email Notifications',
      description: 'Sends automated email notifications',
      status: 'active',
      lastRun: '15 min ago',
      success: 100
    },
    {
      id: 3,
      name: 'Database Backup',
      description: 'Daily backup of production database',
      status: 'paused',
      lastRun: '1 day ago',
      success: 95.2
    },
    {
      id: 4,
      name: 'Report Generation',
      description: 'Weekly analytics report generation',
      status: 'active',
      lastRun: '3 hours ago',
      success: 92.1
    },
    {
      id: 5,
      name: 'Data Validation',
      description: 'Validates incoming data quality',
      status: 'active',
      lastRun: '30 min ago',
      success: 99.8
    },
    {
      id: 6,
      name: 'API Health Check',
      description: 'Monitors external API availability',
      status: 'failed',
      lastRun: '5 min ago',
      success: 87.5
    },
    {
      id: 7,
      name: 'Customer Segmentation',
      description: 'Analyzes and segments customer data',
      status: 'active',
      lastRun: '1 hour ago',
      success: 96.3
    },
    {
      id: 8,
      name: 'Inventory Sync',
      description: 'Syncs inventory across platforms',
      status: 'paused',
      lastRun: '2 days ago',
      success: 94.7
    }
  ];

  // Filter workflows
  let filteredWorkflows = allWorkflows.filter(workflow => 
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply status filter
  if (statusFilter !== 'all') {
    filteredWorkflows = filteredWorkflows.filter(workflow => workflow.status === statusFilter);
  }

  // Sort workflows
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'success':
        return b.success - a.success;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedWorkflows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorkflows = sortedWorkflows.slice(startIndex, startIndex + itemsPerPage);

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
            <p className="text-3xl font-bold text-gray-900">{allWorkflows.length}</p>
            <p className="text-sm text-green-600 mt-2">+3 this week</p>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Active</h3>
            <p className="text-3xl font-bold text-gray-900">{allWorkflows.filter(w => w.status === 'active').length}</p>
            <p className="text-sm text-gray-500 mt-2">75% of total</p>
          </div>
          <div className="bg-yellow-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Paused</h3>
            <p className="text-3xl font-bold text-gray-900">{allWorkflows.filter(w => w.status === 'paused').length}</p>
            <p className="text-sm text-gray-500 mt-2">17% of total</p>
          </div>
          <div className="bg-purple-50 rounded-3xl p-6">
            <h3 className="text-sm text-gray-600 mb-1">Success Rate</h3>
            <p className="text-3xl font-bold text-gray-900">96.4%</p>
            <p className="text-sm text-green-600 mt-2">↑ 2.1%</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => handleFilterChange(setSortBy)(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="success">Sort by Success Rate</option>
          </select>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} {...workflow} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedWorkflows.length)} of {sortedWorkflows.length} workflows
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
      </div>
    </DashboardLayout>
  );
}
