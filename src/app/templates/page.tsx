'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const TemplateCard = ({ name, description, category, nodes, author, uses }: any) => {
  const categoryColors: any = {
    'Marketing': 'bg-purple-100 text-purple-800',
    'Sales': 'bg-blue-100 text-blue-800',
    'Engineering': 'bg-green-100 text-green-800',
    'HR': 'bg-yellow-100 text-yellow-800',
    'Finance': 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
          {category}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {nodes} nodes
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {author}
          </span>
        </div>
        <span className="text-xs">{uses} uses</span>
      </div>
    </div>
  );
};

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Marketing', 'Sales', 'Engineering', 'HR', 'Finance', 'Data', 'Communication'];
  
  const templates = [
    {
      id: 1,
      name: 'Lead Scoring Automation',
      description: 'Automatically score and qualify leads based on their engagement and profile data',
      category: 'Sales',
      nodes: 8,
      author: 'n8n Team',
      uses: '2.3k'
    },
    {
      id: 2,
      name: 'Customer Onboarding Flow',
      description: 'Streamline your customer onboarding process with automated emails and task creation',
      category: 'Marketing',
      nodes: 12,
      author: 'Community',
      uses: '1.8k'
    },
    {
      id: 3,
      name: 'GitHub Issue to Slack',
      description: 'Get notified in Slack when new GitHub issues are created or updated',
      category: 'Engineering',
      nodes: 4,
      author: 'n8n Team',
      uses: '3.1k'
    },
    {
      id: 4,
      name: 'Invoice Processing',
      description: 'Automatically process invoices from email attachments and update accounting system',
      category: 'Finance',
      nodes: 10,
      author: 'Community',
      uses: '890'
    },
    {
      id: 5,
      name: 'Employee Onboarding',
      description: 'Automate new employee setup across IT, HR, and communication tools',
      category: 'HR',
      nodes: 15,
      author: 'n8n Team',
      uses: '1.2k'
    },
    {
      id: 6,
      name: 'Social Media Scheduler',
      description: 'Schedule and publish content across multiple social media platforms',
      category: 'Marketing',
      nodes: 7,
      author: 'Community',
      uses: '2.7k'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="h-screen bg-[#f7f9fb]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
              <p className="text-gray-600 mt-1">Discover pre-built workflows to get started quickly</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Search and Categories */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6d5a] focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-[#ff6d5a] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} {...template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No templates found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

