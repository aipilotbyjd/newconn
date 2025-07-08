'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['core']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuSections = [
    {
      id: 'core',
      name: 'Core',
      items: [
        { icon: '⚡', path: '/workflows', name: 'Workflows' },
        { icon: '▶', path: '/executions', name: 'Executions' },
        { icon: '📋', path: '/templates', name: 'Templates' },
      ]
    },
    {
      id: 'data',
      name: 'Data & Config',
      items: [
        { icon: '🔑', path: '/credentials', name: 'Credentials' },
        { icon: '$', path: '/variables', name: 'Variables' },
        { icon: '🏷', path: '/tags', name: 'Tags' },
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      items: [
        { icon: '📊', path: '/metrics', name: 'Metrics' },
        { icon: '📜', path: '/logs', name: 'Logs' },
        { icon: '🔍', path: '/audit-logs', name: 'Audit Logs' },
      ]
    },
    {
      id: 'admin',
      name: 'Admin',
      items: [
        { icon: '👥', path: '/users', name: 'Users' },
        { icon: '👥', path: '/teams', name: 'Teams' },
        { icon: '🔌', path: '/nodes', name: 'Nodes' },
        { icon: '🌐', path: '/webhooks', name: 'Webhooks' },
        { icon: '⚙', path: '/settings', name: 'Settings' },
      ]
    },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full ${isExpanded ? 'w-64' : 'w-16'} bg-[#1e1e1e] text-white flex flex-col py-4 z-50 transition-all duration-300`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between px-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff6d5a] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">n</span>
          </div>
          {isExpanded && <span className="text-xl font-bold">n8n</span>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            {isExpanded && (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-2 text-xs uppercase text-gray-500 hover:text-gray-300 text-left flex items-center justify-between"
              >
                <span>{section.name}</span>
                <span className="text-xs">{expandedSections.includes(section.id) ? '▼' : '▶'}</span>
              </button>
            )}
            {(!isExpanded || expandedSections.includes(section.id)) && section.items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`w-full ${isExpanded ? 'px-4' : ''} h-12 flex items-center ${isExpanded ? 'justify-start gap-3' : 'justify-center'} text-lg hover:bg-[#2e2e2e] transition-colors relative ${
                  pathname === item.path ? 'bg-[#2e2e2e] text-[#ff6d5a]' : 'text-gray-400'
                }`}
                title={item.name}
              >
                <span className="font-mono flex-shrink-0">{item.icon}</span>
                {isExpanded && <span className="text-sm">{item.name}</span>}
                {pathname === item.path && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#ff6d5a] rounded-r-full" />
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center space-y-2 pb-4">
        <Link 
          href="/help"
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2e2e2e] rounded transition-colors" 
          title="Help"
        >
          <span className="text-lg">?</span>
        </Link>
        <Link
          href="/profile"
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm"
        >
          U
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
