import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Database, Mail, FileJson, Globe, Code, MessageSquare, Settings } from 'lucide-react';

interface ActionNodeData {
  label: string;
  type: string;
  description?: string;
  configured?: boolean;
  executing?: boolean;
  error?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  database: Database,
  postgres: Database,
  mysql: Database,
  mongodb: Database,
  http: Globe,
  email: Mail,
  transform: FileJson,
  set: FileJson,
  code: Code,
  chat: MessageSquare,
  slack: MessageSquare,
};

const ActionNode: React.FC<NodeProps<ActionNodeData>> = ({ data, selected }) => {
  const Icon = iconMap[data.type] || Code;
  
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-md shadow-lg border-2 transition-all ${
      selected ? 'border-orange-500 shadow-xl' : 'border-gray-300 dark:border-gray-600'
    } min-w-[240px] hover:shadow-xl`}>
      {/* Connection points */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white dark:!border-gray-800"
        style={{ left: '-7px' }}
      />
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="font-medium text-gray-800 dark:text-gray-200">{data.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {data.executing && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
          {data.error && (
            <div className="w-2 h-2 bg-red-400 rounded-full" />
          )}
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.description || 'Configure node settings'}
        </p>
        {data.configured && (
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
            Configured
          </div>
        )}
        {data.error && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full" />
            Error in node
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white dark:!border-gray-800"
        style={{ right: '-7px' }}
      />
    </div>
  );
};

export default ActionNode;
