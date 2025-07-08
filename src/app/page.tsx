'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const StatCard = ({ icon, title, value, subtitle, change, trend }: any) => {
  return (
    <div className="bg-blue-50/50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <span className="text-2xl">{icon}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">⋮</span>
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {change && (
          <p className={`text-sm font-medium mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
};

const EmailItem = ({ avatar, name, subject, time }: any) => (
  <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
      {avatar}
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-600">{subject}</p>
    </div>
    <p className="text-sm text-gray-500">{time}</p>
  </div>
);

const TodoItem = ({ icon, text, time }: any) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
      <span className="text-lg">{icon}</span>
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{text}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('last7days');
  const [emailFilter, setEmailFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Mock email data
  const allEmails = [
    { id: 1, avatar: 'HM', name: 'Hannah Morgan', subject: 'Meeting scheduled', time: '1:24 PM' },
    { id: 2, avatar: 'MC', name: 'Megan Clark', subject: 'Update on marketing campaign', time: '12:32 PM' },
    { id: 3, avatar: 'BW', name: 'Brandon Williams', subject: 'Designly 2.0 is about to launch', time: 'Yesterday at 8:57 PM' },
    { id: 4, avatar: 'RS', name: 'Reid Smith', subject: 'My friend Julie loves Dappr!', time: 'Yesterday at 8:49 PM' },
    { id: 5, avatar: 'JS', name: 'John Smith', subject: 'Project update needed', time: '2 days ago' },
    { id: 6, avatar: 'AB', name: 'Alice Brown', subject: 'Budget review meeting', time: '3 days ago' },
    { id: 7, avatar: 'KW', name: 'Kevin Wilson', subject: 'New client onboarding', time: '3 days ago' },
    { id: 8, avatar: 'LT', name: 'Lisa Thompson', subject: 'Team performance report', time: '4 days ago' },
  ];

  // Filter emails based on search
  const filteredEmails = allEmails.filter(email => 
    email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmails = filteredEmails.slice(startIndex, startIndex + itemsPerPage);

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Good morning, James!</h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
            </select>
            <button className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold">
              J
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon="💳"
            title="Your bank balance"
            value="$143,624"
            change="18.7%"
            trend="up"
          />
          <StatCard 
            icon="🔍"
            title="Uncategorized transactions"
            value="12"
          />
          <StatCard 
            icon="👥"
            title="Employees working today"
            value="7"
          />
          <StatCard 
            icon="💳"
            title="This week's card spending"
            value="$3,287.49"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Revenue & Recent Emails */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Revenue</h3>
                  <p className="text-sm text-gray-500">Last 7 days VS prior week</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-black rounded-full mr-1"></span>
                    Feb 14: $18,334.78
                  </span>
                  <span className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>
                    Feb 15: $12,765.24
                  </span>
                </div>
              </div>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">Revenue Chart Placeholder</p>
              </div>
            </div>

            {/* Recent Emails */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Recent emails</h3>
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search emails..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                    />
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {/* Filter */}
                  <select
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="starred">Starred</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                {paginatedEmails.map((email) => (
                  <EmailItem
                    key={email.id}
                    avatar={email.avatar}
                    name={email.name}
                    subject={email.subject}
                    time={email.time}
                  />
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEmails.length)} of {filteredEmails.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - New Clients, Invoices, Todo, Board Meeting */}
          <div className="space-y-6">
            {/* New Clients & Invoices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">New clients</h3>
                <p className="text-4xl font-bold text-gray-900">54</p>
                <p className="text-sm text-green-600 font-medium">+18.7%</p>
              </div>
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoices overdue</h3>
                <p className="text-4xl font-bold text-gray-900">6</p>
                <p className="text-sm text-red-600 font-medium">+2.7%</p>
              </div>
            </div>

            {/* Formation Status */}
            <div className="bg-black text-white rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">Formation status</h3>
              <p className="text-sm text-gray-400 mb-4">In progress</p>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm mb-4">Estimated processing<br />4-5 business days</p>
              <button className="w-full bg-white text-black py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors">
                View status
              </button>
            </div>

            {/* Your to-Do list */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your to-Do list</h3>
              <div className="space-y-2">
                <TodoItem 
                  icon="📋"
                  text="Run payroll"
                  time="Mar 4 at 6:00 pm"
                />
                <TodoItem 
                  icon="⏰"
                  text="Review time off request"
                  time="Mar 7 at 6:00 pm"
                />
                <TodoItem 
                  icon="✍️"
                  text="Sign board resolution"
                  time="Mar 12 at 6:00 pm"
                />
                <TodoItem 
                  icon="💬"
                  text="Finish onboarding Tony"
                  time="Mar 12 at 6:00 pm"
                />
              </div>
            </div>

            {/* Board Meeting */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Board meeting</h3>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </div>
              <p className="text-sm opacity-90 mb-4">Feb 22 at 6:00 PM</p>
              <p className="text-sm opacity-80">
                You have been invited to attend a<br />
                meeting of the Board Directors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

