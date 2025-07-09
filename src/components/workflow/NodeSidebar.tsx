import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { 
  Clock, 
  MousePointer, 
  Webhook, 
  Calendar,
  Database, 
  Mail, 
  FileJson, 
  Globe, 
  Code, 
  MessageSquare,
  GitBranch,
  Filter,
  Zap,
  FileText,
  Cloud,
  Shield,
  Users,
  BarChart
} from 'lucide-react';

interface NodeCategory {
  name: string;
  nodes: NodeTemplate[];
}

interface NodeTemplate {
  type: string;
  label: string;
  icon: React.ElementType;
  description: string;
  category: string;
  data: any;
}

const allNodes: NodeTemplate[] = [
  // Triggers
  {
    type: 'trigger',
    label: 'Manual Trigger',
    icon: MousePointer,
    description: 'Triggers the workflow manually',
    category: 'Triggers',
    data: { type: 'manual' }
  },
  {
    type: 'trigger',
    label: 'Schedule Trigger',
    icon: Clock,
    description: 'Triggers the workflow on a schedule',
    category: 'Triggers',
    data: { type: 'schedule' }
  },
  {
    type: 'trigger',
    label: 'Webhook',
    icon: Webhook,
    description: 'Triggers the workflow via webhook',
    category: 'Triggers',
    data: { type: 'webhook' }
  },
  // Core Nodes
  {
    type: 'action',
    label: 'HTTP Request',
    icon: Globe,
    description: 'Makes HTTP requests',
    category: 'Core Nodes',
    data: { type: 'http' }
  },
  {
    type: 'action',
    label: 'Set',
    icon: FileJson,
    description: 'Sets values',
    category: 'Core Nodes',
    data: { type: 'set' }
  },
  {
    type: 'action',
    label: 'Function',
    icon: Code,
    description: 'Run custom JavaScript code',
    category: 'Core Nodes',
    data: { type: 'code' }
  },
  {
    type: 'logic',
    label: 'IF',
    icon: GitBranch,
    description: 'Routes data conditionally',
    category: 'Core Nodes',
    data: { type: 'condition' }
  },
  {
    type: 'action',
    label: 'Merge',
    icon: GitBranch,
    description: 'Merges data from multiple sources',
    category: 'Core Nodes',
    data: { type: 'merge' }
  },
  // Data Transformation
  {
    type: 'action',
    label: 'Item Lists',
    icon: FileText,
    description: 'Splits, aggregates, and manages lists',
    category: 'Data Transformation',
    data: { type: 'itemLists' }
  },
  {
    type: 'action',
    label: 'HTML Extract',
    icon: Code,
    description: 'Extracts data from HTML',
    category: 'Data Transformation',
    data: { type: 'htmlExtract' }
  },
  // Files
  {
    type: 'action',
    label: 'Read/Write Files',
    icon: FileText,
    description: 'Access data from the computer',
    category: 'Files',
    data: { type: 'files' }
  },
  // Communication
  {
    type: 'action',
    label: 'Send Email',
    icon: Mail,
    description: 'Sends emails via SMTP',
    category: 'Communication',
    data: { type: 'email' }
  },
  {
    type: 'action',
    label: 'Slack',
    icon: MessageSquare,
    description: 'Post messages to Slack',
    category: 'Communication',
    data: { type: 'slack' }
  },
  // Databases
  {
    type: 'action',
    label: 'Postgres',
    icon: Database,
    description: 'Get, add, and update data in Postgres',
    category: 'Databases',
    data: { type: 'postgres' }
  },
  {
    type: 'action',
    label: 'MySQL',
    icon: Database,
    description: 'Get, add, and update data in MySQL',
    category: 'Databases',
    data: { type: 'mysql' }
  },
  {
    type: 'action',
    label: 'MongoDB',
    icon: Database,
    description: 'Find, insert, and update documents',
    category: 'Databases',
    data: { type: 'mongodb' }
  },
];

const categories = [
  'All',
  'Triggers',
  'Core Nodes',
  'Data Transformation',
  'Files',
  'Communication',
  'Databases',
];

interface NodeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNodes = allNodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onDragStart = (event: React.DragEvent, node: NodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Node</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div
                key={`${node.type}-${node.label}-${index}`}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-move transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, node)}
              >
                <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{node.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {node.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NodeSidebar;
