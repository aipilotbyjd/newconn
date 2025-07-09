import React from 'react';
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
  Filter
} from 'lucide-react';

interface NodeTemplate {
  type: string;
  label: string;
  nodeType: 'trigger' | 'action' | 'logic';
  icon: React.ElementType;
  description: string;
  data: any;
}

const nodeTemplates: NodeTemplate[] = [
  // Triggers
  {
    type: 'trigger',
    label: 'Manual Trigger',
    nodeType: 'trigger',
    icon: MousePointer,
    description: 'Start workflow manually',
    data: { type: 'manual' }
  },
  {
    type: 'trigger',
    label: 'Schedule Trigger',
    nodeType: 'trigger',
    icon: Clock,
    description: 'Run on a schedule',
    data: { type: 'schedule' }
  },
  {
    type: 'trigger',
    label: 'Webhook',
    nodeType: 'trigger',
    icon: Webhook,
    description: 'Trigger via webhook',
    data: { type: 'webhook' }
  },
  // Actions
  {
    type: 'action',
    label: 'HTTP Request',
    nodeType: 'action',
    icon: Globe,
    description: 'Make HTTP requests',
    data: { type: 'http' }
  },
  {
    type: 'action',
    label: 'Database',
    nodeType: 'action',
    icon: Database,
    description: 'Query databases',
    data: { type: 'database' }
  },
  {
    type: 'action',
    label: 'Send Email',
    nodeType: 'action',
    icon: Mail,
    description: 'Send emails',
    data: { type: 'email' }
  },
  {
    type: 'action',
    label: 'Transform Data',
    nodeType: 'action',
    icon: FileJson,
    description: 'Transform JSON data',
    data: { type: 'transform' }
  },
  {
    type: 'action',
    label: 'Run Code',
    nodeType: 'action',
    icon: Code,
    description: 'Execute custom code',
    data: { type: 'code' }
  },
  {
    type: 'action',
    label: 'AI Chat',
    nodeType: 'action',
    icon: MessageSquare,
    description: 'Chat with AI',
    data: { type: 'chat' }
  },
  // Logic
  {
    type: 'logic',
    label: 'If/Else',
    nodeType: 'logic',
    icon: GitBranch,
    description: 'Conditional logic',
    data: { type: 'condition' }
  },
  {
    type: 'logic',
    label: 'Filter',
    nodeType: 'logic',
    icon: Filter,
    description: 'Filter data',
    data: { type: 'filter' }
  },
];

const FlowSidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeTemplate: NodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeTemplate));
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories = {
    trigger: nodeTemplates.filter(n => n.nodeType === 'trigger'),
    action: nodeTemplates.filter(n => n.nodeType === 'action'),
    logic: nodeTemplates.filter(n => n.nodeType === 'logic'),
  };

  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Node Library</h3>
      
      {Object.entries(categories).map(([category, nodes]) => (
        <div key={category} className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase mb-2">
            {category}s
          </h4>
          <div className="space-y-2">
            {nodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={`${node.type}-${node.data.type}`}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move border border-gray-200 dark:border-gray-700"
                  draggable
                  onDragStart={(e) => onDragStart(e, node)}
                >
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {node.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {node.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowSidebar;
