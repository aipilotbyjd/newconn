'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const ExecutionRow = ({ id, workflowName, status, mode, startTime, duration, data }: any) => {
  const statusConfig = {
    success: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-100', text: 'text-red-800', icon: '✕' },
    running: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⟳' },
    waiting: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏸' }
  };

  const config = statusConfig[status] || statusConfig.success;

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${config.bg} ${config.text} flex items-center justify-center text-sm font-medium`}>
            {config.icon}
          </div>
          <div>
            <p className="font-medium text-gray-900">#{id}</p>
            <p className="text-sm text-gray-500">{workflowName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{mode}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{startTime}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{duration}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function Executions() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allExecutions = [
    { id: '245892', workflowName: 'Customer Data Sync', status: 'success', mode: 'Production', startTime: '2024-01-08 14:23:45', duration: '2.3s' },
    { id: '245891', workflowName: 'Send Welcome Email', status: 'running', mode: 'Production', startTime: '2024-01-08 14:22:10', duration: '-' },
    { id: '245890', workflowName: 'Database Backup', status: 'error', mode: 'Production', startTime: '2024-01-08 14:15:00', duration: '45.2s' },
    { id: '245889', workflowName: 'Invoice Generation', status: 'success', mode: 'Test', startTime: '2024-01-08 14:10:23', duration: '5.1s' },
    { id: '245888', workflowName: 'Slack Notification', status: 'success', mode: 'Production', startTime: '2024-01-08 14:05:15', duration: '0.8s' },
    { id: '245887', workflowName: 'Data Transform', status: 'waiting', mode: 'Production', startTime: '2024-01-08 14:00:00', duration: '-' },
    { id: '245886', workflowName: 'API Health Check', status: 'success', mode: 'Production', startTime: '2024-01-08 13:55:30', duration: '1.2s' },
    { id: '245885', workflowName: 'Customer Data Sync', status: 'success', mode: 'Production', startTime: '2024-01-08 13:50:10', duration: '2.5s' },
  ];

  // Filter executions
  let filteredExecutions = allExecutions;
  if (filter !== 'all') {
    filteredExecutions = filteredExecutions.filter(exec => exec.status === filter);
  }
  if (searchQuery) {
    filteredExecutions = filteredExecutions.filter(exec => 
      exec.workflowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exec.id.includes(searchQuery)
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredExecutions.length / itemsPerPage);
  const paginatedExecutions = filteredExecutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Executions</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your workflow executions</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by workflow name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('success')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Success
              </button>
              <button
                onClick={() => setFilter('error')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'error' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Error
              </button>
              <button
                onClick={() => setFilter('running')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'running' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Running
              </button>
            </div>
          </div>
        </div>

        {/* Executions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedExecutions.map((execution) => (
                <ExecutionRow key={execution.id} {...execution} />
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredExecutions.length)} of {filteredExecutions.length} executions
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
