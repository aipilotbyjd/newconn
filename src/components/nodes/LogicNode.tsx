import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { GitBranch, Filter, Repeat, Timer } from 'lucide-react';

interface LogicNodeData {
  label: string;
  type: 'condition' | 'filter' | 'loop' | 'delay';
  description?: string;
  configured?: boolean;
}

const iconMap = {
  condition: GitBranch,
  filter: Filter,
  loop: Repeat,
  delay: Timer,
};

const LogicNode: React.FC<NodeProps<LogicNodeData>> = ({ data, selected }) => {
  const Icon = iconMap[data.type] || GitBranch;
  
  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-2 ${
      selected ? 'border-yellow-300' : 'border-transparent'
    } min-w-[200px] transition-all duration-200 hover:shadow-xl`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-yellow-300"
      />
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <div className="flex flex-col flex-1">
          <div className="text-sm font-bold">{data.label}</div>
          {data.description && (
            <div className="text-xs opacity-90">{data.description}</div>
          )}
        </div>
        {data.configured && (
          <div className="w-2 h-2 bg-green-300 rounded-full" title="Configured" />
        )}
      </div>
      {data.type === 'condition' ? (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            style={{ left: '30%' }}
            className="w-3 h-3 !bg-green-300"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            style={{ left: '70%' }}
            className="w-3 h-3 !bg-red-300"
          />
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-yellow-300"
        />
      )}
    </div>
  );
};

export default LogicNode;
