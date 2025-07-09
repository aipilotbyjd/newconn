import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Clock, MousePointer, Webhook, Calendar, Play } from 'lucide-react';

interface TriggerNodeData {
  label: string;
  type: 'manual' | 'schedule' | 'webhook' | 'event';
  description?: string;
  configured?: boolean;
  executing?: boolean;
}

const iconMap = {
  manual: MousePointer,
  schedule: Clock,
  webhook: Webhook,
  event: Calendar,
};

const TriggerNode: React.FC<NodeProps<TriggerNodeData>> = ({ data, selected }) => {
  const Icon = iconMap[data.type] || MousePointer;
  
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-md shadow-lg border-2 transition-all ${
      selected ? 'border-orange-500 shadow-xl' : 'border-gray-300 dark:border-gray-600'
    } min-w-[240px] hover:shadow-xl`}>
      {/* Header */}
      <div className="px-4 py-3 bg-orange-500 text-white rounded-t-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-medium">{data.label}</span>
        </div>
        {data.executing && (
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.description || 'Configure trigger settings'}
        </p>
        {data.configured && (
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
            Configured
          </div>
        )}
      </div>

      {/* Play button */}
      <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors">
        <Play className="w-3 h-3 ml-0.5" />
      </button>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white dark:!border-gray-800"
        style={{ right: '-7px' }}
      />
    </div>
  );
};

export default TriggerNode;
